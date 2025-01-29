import React, { useRef, useState, useEffect } from "react";
import audio from "../resources/resume_audio.mp3";
import CustomSlider from "../components/inputs/slider";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
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
        setAudioAvailable(false);  // Set audio availability state to false
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

  const jumpToTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(Math.round((time / audioRef.current.duration) * 100));
      if (!isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Error during playback:", err);
          setAudioAvailable(false); // Set audio availability state to false
        });
        setIsPlaying(true);
      }
    }
  };

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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          console.error("Error during playback:", err);
          setAudioAvailable(false); // Set audio availability state to false
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <group data-gap="15" data-space-vertical="30">
      <group data-space-horizontal="30">
        <text data-wrap="wrap" data-line="1.5" data-weight="600" data-length="400">
          Listen AI dive into my resume, discussing it with zero input from me.
          A fun, AI-powered take on my career journey.
        </text>
      </group>

      {audioAvailable ? (

<>

<audio ref={audioRef} src={audio} onTimeUpdate={updateProgress} preload="metadata" />
      

      <group data-space-horizontal="15">
        {timestamps.map(({ time, label }) => {
          const isActive = Math.abs(currentTime - time) <= HIGHLIGHT_RANGE;

          return (
            <group
              data-interactive=""
              data-over-color="neutral"
              key={time}
              data-background={isActive ? "highlight" : ""}
              data-color="text"
              data-radius="10"
              data-space="15"
              data-cursor="pointer"
              onClick={() => jumpToTime(time)}
              data-gap="10"
              data-wrap="no"
            >
              <text data-weight="700">{formatTime(time)}</text>
              <text data-ellipsis="">{label}</text>
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
          trackLeftProps={{ "data-margin":"0" }}
          trackRightProps={{ "data-opacity": "20" }}
        />

        <group
          data-length="100"
          data-cursor="pointer"
          data-interactive=""
          data-radius="10"
          data-space="15"
          data-background="text"
          data-color="main-background"
          data-over-color="neutral"
          onClick={togglePlay}
          data-justify="center"

         
        >
          <text data-weight="700">{isPlaying ? "Pause" : "Listen"}</text>
        </group>
      </group>

</>

) : (
  <group data-space="30" >
    <text data-wrap="wrap" data-line="1.5" >Audio unavailable, <br></br>please try again later.</text>

    
    </group>
)}

    </group>
  );
};

export default AudioPlayer;
