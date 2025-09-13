import React, { useRef, useState, useEffect } from "react";
import audio from "../resources/resume_audio.mp3";
import CustomSlider from "../components/inputs/slider";
import Ripple from "../components/Ripple";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const visualizerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioAvailable, setAudioAvailable] = useState(true); // State to track audio availability

  const timestamps = [
    { time: 10, label: "Intro" },
    { time: 120, label: "Time Managment" },
    { time: 160, label: "Coding" },
    { time: 185, label: "Team player" },
    { time: 212, label: "Big Question" },
  ];

  const HIGHLIGHT_RANGE = 10;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const handleAudioEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      };

      const handleError = () => {
        console.error("Playback error occurred");
        setAudioAvailable(false); // Set audio availability state to false
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("ended", handleAudioEnd);
      audio.addEventListener("error", handleError); // Listen for error events

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("ended", handleAudioEnd);
        audio.removeEventListener("error", handleError); // Clean up error event listener
      };
    }
  }, []);

  // const jumpToTime = (time: number) => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = time;
  //     setProgress(Math.round((time / audioRef.current.duration) * 100));
  //     if (!isPlaying) {
  //       audioRef.current.play().catch((err) => {
  //         console.error("Error during playback:", err);
  //         setAudioAvailable(false); // Set audio availability state to false
  //       });

  //       playAudio();
  //         loop();
  //     }
  //   }
  // };

  const updateProgress = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime;
      setCurrentTime(newTime);
      setProgress(Math.round((newTime / audioRef.current.duration) * 100));
    }
  };

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
      setProgress(value);
    }
  };

  // const togglePlay = () => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     if (isPlaying) {
  //       audio.pause();
  //     } else {
  //       audio.play().catch((err) => {
  //         console.error("Error during playback:", err);
  //         setAudioAvailable(false); // Set audio availability state to false
  //       });
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const initializeAudioContext = () => {
    if (!audioRef.current || contextRef.current) return;

    const audio = audioRef.current;
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const src = context.createMediaElementSource(audio);

    src.connect(analyser);
    analyser.connect(context.destination);

    contextRef.current = context;
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (!contextRef.current) {
      initializeAudioContext(); // Initialize only when user interacts
    }

    if (contextRef.current?.state === "suspended") {
      contextRef.current.resume().then(() => playAudio());
    } else {
      if (audioRef.current.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    }
  };

  const jumpToTime = (time: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setProgress(Math.round((time / audioRef.current.duration) * 100));

    if (!isPlaying) {
      togglePlay(); // Ensure proper playback flow (resumes context + calls playAudio + starts loop)
    }
  };

  // useEffect(() => {
  //   if (audioRef.current && !contextRef.current) {
  //     const audio = audioRef.current;
  //    // audio.crossOrigin = "anonymous";

  //     // Create the AudioContext here if not already created
  //     const context = new AudioContext();
  //     const analyser = context.createAnalyser();
  //     const src = context.createMediaElementSource(audio);

  //     src.connect(analyser);
  //     analyser.connect(context.destination);

  //     contextRef.current = context;
  //     analyserRef.current = analyser;
  //     dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
  //   }
  // }, []);

  // const togglePlay = () => {
  //   if (!audioRef.current || !contextRef.current) return;

  //   // Ensure AudioContext is resumed (or created) on user gesture
  //   if (contextRef.current.state === 'suspended') {
  //     contextRef.current.resume().then(() => playAudio());
  //   } else {
  //     if (audioRef.current.paused) {
  //       playAudio();
  //     } else {
  //       pauseAudio();
  //     }
  //   }
  // };

  const playAudio = () => {
    if (!audioRef.current || !contextRef.current) return;

    audioRef.current.play();
    setIsPlaying(true);
    loop();
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const loop = () => {
    if (
      !audioRef.current ||
      !analyserRef.current ||
      !dataArrayRef.current ||
      !visualizerRef.current
    )
      return;

    if (audioRef.current.paused) return;

    requestAnimationFrame(loop);

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    changeTracks();
  };

  // const changeTracks = () => {
  //   if (!visualizerRef.current || !dataArrayRef.current) return;

  //   const tracks = visualizerRef.current.children;
  //   for (let i = 0; i < tracks.length; i++) {
  //     (tracks[i] as HTMLElement).style.height = `${
  //       dataArrayRef.current[i * 5] * 0.4
  //     }%`;
  //   }
  // };

  const changeTracks = () => {
    if (!visualizerRef.current || !dataArrayRef.current) return;

    const trackStyles: string[] = [];

    // Loop through and update the bars' heights based on the frequency data
    const tracks = visualizerRef.current.querySelectorAll("rect");
    for (let i = 0; i < tracks.length; i++) {
      //  const rect = tracks[i];
      const height = (dataArrayRef.current[i * 5] / 255) * 50; // Scale the height
      trackStyles.push(`transform: scaleY(${height / 40});`);
    }

    // Apply all styles at once to prevent multiple reflows
    tracks.forEach((track, index) => {
      track.style.cssText = trackStyles[index];
    });
  };

  return (
    <group data-gap="15" data-space-vertical="30">
      <group data-space-horizontal="30">
        <text
          data-wrap="wrap"
          data-line="1.5"
          data-weight="600"
          data-length="400"
        >
          Listen AI dive into my resume, discussing it with zero input from me.
          A fun, AI-powered take on my career journey.
        </text>
      </group>

      {audioAvailable ? (
        <>
          <audio
            ref={audioRef}
            src={audio}
            onTimeUpdate={updateProgress}
            preload="metadata"
          />

          <group data-space-horizontal="15">
            {timestamps.map(({ time, label }) => {
              const isActive = Math.abs(currentTime - time) <= HIGHLIGHT_RANGE;

              return (
                <group
                  key={time}
                  data-color="text"
                  data-cursor="pointer"
                  onClick={() => jumpToTime(time)}
                >
                  <Ripple>
                    <group
                      data-background={isActive ? "highlight" : ""}
                      data-contain=""
                      data-ink-color="neutral"
                      data-radius="10"
                      data-space="15"
                      data-gap="10"
                      data-wrap="no"
                      data-interactive=""
                      data-over-color="neutral"
                    >
                      <text data-weight="700">{formatTime(time)}</text>
                      <text data-ellipsis="">{label}</text>
                    </group>
                  </Ripple>
                </group>
              );
            })}
          </group>

          <group data-space-horizontal="30" data-gap="30">
            <CustomSlider
              start={0}
              end={100}
              step={1}
              showvalue={false}
              value={progress}
              onValueChange={handleSliderChange}
              unit={formatTime(currentTime)}
              handlerProps={{
                "data-background": "none",
                "data-color": "text",
                "data-border" : "inset-2",
   
              }}
              trackLeftProps={{ "data-margin": "0",  }}
              trackRightProps={{ "data-opacity": "10",  }}
            />

            <group>
              <group
               // data-length="140"
                data-cursor="pointer"
                data-interactive=""
                data-radius="30"
                data-space="15"
                data-background="text"
                data-color="main-background"
                data-over-color="neutral"
                onClick={togglePlay}
                data-justify="center"
              >
                <text data-weight="700">{isPlaying ? "Pause" : "Listen"}</text>
              </group>
              <group
                data-height={isPlaying ? "30" : "0"}
    
                data-duration=".125"
              ></group>
              <group

                data-height={isPlaying ? "40" : "0"}
                data-opacity={isPlaying ? "" : "0"}
                data-contain=""
                data-duration=".125"
                data-width="auto"
                data-align="center"
                data-gap="2"
                ref={visualizerRef}
              >
                {/* {Array.from({ length: 50 }).map((_, i) => (
                  <group data-length="2" data-background="text" key={i} />
                ))} */}

                <svg
                  fill="currentColor"
                  width="200"
                  height="40"
                  viewBox="0 0 200 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {Array.from({ length: 50 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 4}
                      width="2"
                      height="40"
                      // style={{
                      //   transform: `scaleY(${Math.random() * 1})`,

                      // }}
                      transform-origin="center"
                      data-will-change="transform"
                    />
                  ))}
                </svg>
              </group>
            </group>
          </group>
        </>
      ) : (
        <group data-space="30">
          <text data-wrap="wrap" data-line="1.5">
            Audio unavailable, <br></br>please try again later.
          </text>
        </group>
      )}
    </group>
  );
};

export default AudioPlayer;
