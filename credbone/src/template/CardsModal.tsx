import React, { useState } from "react";
import StuckReporter from "../components/StuckReporter";
import { Volume2, VolumeOff, X } from "lucide-react";
import { useFavMap } from "./useFavMap";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

interface CardModalProps {
  item: {
    key: string;
    title: string;
    description: string;
    long_description: string;
    image: string;
    video: string;
  };
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ item, onClose }) => {
  const [loading, setLoading] = useState(true);



    const { isFav, toggleFav } = useFavMap();
  const { addSnackbar } = useSnackbar();

  const handleFav = () => {
    toggleFav(item.key);
    if (!isFav(item.key)) {
      addSnackbar(`${item.title} added to favorites`, 1500);
    }
  };


  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering play/pause

    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <group data-min-height="fit">
      <group
        data-position="absolute"
        data-height="fit"
        data-background=""
        onClick={onClose}
      ></group>
      <group
        data-max-length="500"
        data-space="30"
        data-gap="10"
        data-position="center"
      >
        <group>
          <group data-gap="10" data-max-length="300" data-direction="column">
            <text
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2.25"
              data-font-type="hero"
              data-text-size="x-large"
              data-wrap="wrap"
            >
              {item.title}
            </text>
            <text
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration="2.5"
              data-weight="600"
              data-text-size=""
              data-wrap="wrap"
              data-line="1.5"
            >
              {item.description}
            </text>
          </group>
        </group>

        <StuckReporter>
          {(isSticky) => (
            <group
              data-duration=".125"
              data-space-horizontal={isSticky ? "20" : "0"}
              data-space-top="20"
              data-sticky="top"
              data-wrap="no"
              data-gap="10"
            >
              <group
                data-over-color="neutral"
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="2.5"
                data-background="text"
                data-color="main-background"
                data-interactive=""
                data-width="auto"
                data-cursor="pointer"
                data-space="15"
                data-space-horizontal={isSticky ? "" : "20"}
                data-radius="30"
                onClick={onClose}
                data-align="center"
                //   data-min-length="160"
                data-gap={isSticky ? "0" : "10"}
              >
                <group data-width="auto" data-interact="">
                  <X size={20} />
                </group>
                <text
                  data-weight="600"
                  data-duration=".225"
                  data-opacity={isSticky ? "0" : ""}
                  data-transition-prop="font-size"
                  data-text-size={isSticky ? "0" : ""}
                >
                  Close
                </text>
              </group>

{item.video && (

              <group
                data-radius="30"
                data-over-color="neutral"
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="3.5"
                data-background="text"
                data-color="main-background"
                data-interactive=""
                data-width="auto"
                data-cursor="pointer"
                data-space="15"
                onClick={toggleMute}
              >
                <group data-width="auto" data-interact="">
                  {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                </group>
              </group>

)}


            </group>
          )}
        </StuckReporter>

        <group data-height="20"></group>

        <group
         // onClick={toggleVideo}

 onClick={toggleVideo}
 // onDoubleClick={handleFav}

          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="2.75"
          data-contain=""
          data-radius="30"
          data-direction="column"
          data-wrap="no"
          data-ratio="4:7"
          data-backdrop="20"
        >
          {loading && (
            <group data-space="50" data-direction="column">
              <group
                data-background="adaptive-gray"
                data-height="2"
                data-length="80"
                data-contain=""
                data-radius="10"
                data-position="center"
              >
                <group
                  data-radius="10"
                  data-background="text"
                  data-animation-interation="infinite"
                  data-animation-name="to-left-right"
                  data-animation-duration="7.75"
                  data-animation-direction="alternate"
                ></group>
              </group>
            </group>
          )}
          <picture
            data-position="center"
            data-hide={loading ? "true" : undefined}
          >
            <img src={item.image} alt={item.title} onLoad={handleImageLoad} />
          </picture>

          {item.video && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              data-object-fit="cover"
              data-height="fit"
              data-max-length="fit"
              data-length="fit"
              src={item.video}
              data-position="absolute"
              data-pointer-event="none"
            ></video>
          )}
        </group>
        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="3"
          data-space="30"
          data-radius="30"
          data-backdrop="20"
        >
          <text
            data-weight="600"
            data-text-size=""
            data-wrap="wrap"
            data-line="1.5"
          >
            {item.long_description}
          </text>
        </group>
      </group>
    </group>
  );
};

export default CardModal;
