import React, { useEffect, useRef, useState } from "react";

import Radio, { RadioType } from "../components/inputs/radio";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { ContentData } from "./utils/ContentData";

import {
  IconHeart,
  IconMoreHoriz,
  IconShare,
  IconTableRows,
  IconViewStream,
  IconViewWindow,
} from "../components/icon/credIcons";
import Popover from "../components/popover";
import Tooltip from "../components/tooltip";
// import Count from "../components/Coutner";
import StuckReporter from "../components/StuckReporter";
import { Link, useSearchParams } from "react-router-dom";
import { useModal } from "../components/Modal";
import Marquee from "../components/Marquee";
import CardModal from "./CardsModal";
import TemplatePageHeader from "./TemplatePageHeader";
import { ArrowDown, Copy, Film, Link2, Share } from "lucide-react";
import { useFavMap } from "./useFavMap";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import MenuItem from "../components/MenuItem";

interface ContentToolbarProps {
  count: number;
  itemKey: string;
  itemTitle: string;
  color?: boolean;
  imageUrl?: string;
}

const modalConfig = {
  "data-radius": "none",
  "data-margin": "0",
  "data-background": "main-background-top",
  "data-elevation": "none",
  "data-width": "fit",
  "data-scroll": "",
  "data-min-height": "fit",
  "data-contain": "scroll",
};

const useOpenCustomModal = () => {
  const { openModal, closeModal } = useModal();
  const [, setSearchParams] = useSearchParams();

  const handleOpenModal = (item: {
    key: string;
    title: string;
    description: string;
    long_description: string;
    image: string;
    video: string;
  }) => {
    // REMOVED: setSearchParams({ item: item.key });

    openModal({
      id: `modal-${item.key}`,
      title: item.title,
      content: (
        <CardModal
          item={item}
          onClose={() => {
            closeModal(`modal-${item.key}`);
            setSearchParams({}); // Keep this so closing clears the URL
          }}
        />
      ),
      hasHeader: false,
      hasToolbar: false,
      customAttributes: modalConfig,
      spacing: 0,
    });
  };

  return handleOpenModal;
};

const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename
      ? `${filename.replace(/\s+/g, "_")}_Credbone.jpg`
      : "download.jpg";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download image:", error);
    //  addSnackbar("Failed to download image:", 1500);
  }
};





const ContentToolbar: React.FC<ContentToolbarProps> = ({
  count,
  itemKey,
  itemTitle,
  color,
  imageUrl,
}) => {
  const { addSnackbar } = useSnackbar();
  const { isFav, toggleFav } = useFavMap();
  const favorite = isFav(itemKey);

  const handleDownloadClick = () => {
    if (imageUrl) {
      downloadImage(imageUrl, itemTitle);
      addSnackbar(`Downloading ${itemTitle}...`, 1500);
    }
  };



const imageFileRef = useRef<File | null>(null);

useEffect(() => {
  if (!imageUrl) return;
  fetch(imageUrl)
    .then(r => r.blob())
    .then(blob => {
      imageFileRef.current = new File([blob], `${itemTitle}.jpg`, { type: blob.type });
    })
    .catch(() => {});
}, [imageUrl]);

const handleNativeShare = async () => {
  if (!('share' in navigator)) return;

  const url = `${window.location.origin}${window.location.pathname}?item=${itemKey}`;
  const shareData: ShareData = { url, title: itemTitle };

  const file = imageFileRef.current;
  if (file && navigator.canShare?.({ files: [file] })) {
    shareData.files = [file];
  }

  try {
    await navigator.share(shareData);
  } catch (err) {
    if ((err as DOMException).name !== "AbortError") console.error(err);
  }
};
  


  const handleFavClick = () => {
    toggleFav(itemKey);
    if (!favorite) {
      addSnackbar(`${itemTitle} added to favorites...`, 1500);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?item=${itemKey}`;
    // navigator.clipboard.writeText(url);

    try {
      await navigator.clipboard.writeText(url);
      addSnackbar("Link copied", 1500);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  const displayCount = count + (favorite ? 1 : 0);




const menuItems = [
  { icon: <ArrowDown strokeWidth={1.5} size={20} />, title: "Download", description: "Save Image", onClick: handleDownloadClick },
  { icon: <Link2 strokeWidth={1.5} size={20} />, title: "Share Link", description: "Copy URL for sharing", onClick: handleShare },
  ...('share' in navigator ? [{
    icon: <Share strokeWidth={1.5} size={20} />,
    title: "Share",
    description: "Share image via...",
    onClick: handleNativeShare,
  }] : []),
];


  return (
    <group
      onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      onMouseDown={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      data-wrap="no"
      data-justify="start"
      data-width="auto"
      data-index="1"
      data-align="center"
      //data-gap="5"
    >
      <Popover



      bottomsheet
      data-space="5"
      data-radius="20"
      content={(closePopover, isBottomSheet) => (
          <group
            data-direction="column"
            data-length={isBottomSheet ? undefined :"220"}
            onClick={closePopover}

          >
            <group data-direction="column" data-contain="" >
              {/* <group
                onClick={handleDownloadClick}
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="2.75"
                data-name="autoseparation"
              >
                <separator
                  data-horizontal=""
                  data-margin-horizontal="10"
                  data-opacity="5"
                ></separator>
                <group
                   data-space={isBottomSheet ? "20" : "15"}
                  data-align="center"
                  data-gap="15"
                  data-interactive=""
                  data-radius="15"
                  data-cursor="pointer"
                  data-wrap="no"
                >
                  <group data-length="20" data-opacity="30" data-interact="">
                    <ArrowDown strokeWidth={1.5} size={20} />
                  </group>
                  <group data-direction="column" data-width="auto">
                    <text data-weight="700">Download</text>
                    <text data-opacity="30">Save Image</text>
                  </group>
                </group>
              </group>

              <group
                onClick={handleShare}

                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="3"
                data-name="autoseparation"
              >
                <separator
                  data-horizontal=""
                  data-margin-horizontal="10"
                  data-opacity="5"
                ></separator>
                <group
                  data-space={isBottomSheet ? "20" : "15"}
                  data-align="center"
                  data-gap="15"
                  data-interactive=""
                  data-radius="15"
                  data-cursor="pointer"
                  data-wrap="no"
                >
                  <group data-length="20" data-opacity="30" data-interact="">
                    <Link2 strokeWidth={1.5} size={20} />
                  </group>
                  <group data-direction="column" data-width="auto">
                    <group
                      data-direction="column"
                      data-width="auto"
                      data-contain=""
                    >
                      <text data-weight="700">Share Link</text>
                      <text data-opacity="30" data-ellipsis="">
                        Copy URL for sharing
                      </text>
                    </group>
                  </group>
                </group>
              </group> */}



                    {menuItems.map((item, index) => (
                      <group
                       key={item.title}
                        data-name="autoseparation"
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration={2 + index * 0.5}
                      >
                        <separator
                          data-horizontal=""
                          data-margin-horizontal="10"
                          data-opacity="5"
                        ></separator>

                        <MenuItem
                         
                          icon={item.icon}
                          title={item.title}
                          description={item.description}
                          onClick={item.onClick}
                          data-space={isBottomSheet ? "20" : "15"}
                          data-gap={isBottomSheet ? "20" : "15"}
                        />
                      </group>
                    ))}


            </group>
          </group>
        )}
      >
        <group
          data-width="auto"
          data-space="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="2.75"
          data-interactive=""
          data-radius="10"
          data-align="center"
          data-gap="10"
          data-cursor="pointer"

        >
          <IconShare size={20} />
        </group>
      </Popover>

      <Tooltip delay={300} content="Like">
        <group
          data-width="auto"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="3.75"
          data-align="center"
          data-gap="10"
          data-space="10"
          data-interactive=""
          data-radius="10"
          data-cursor="pointer"
          onClick={handleFavClick}
          data-wrap="no"
        >
          <group
            data-animation-duration="4.75"
            data-fill-mode="backwards"
            key={favorite ? `${itemKey}-fav` : itemKey}
            data-animation-name={favorite ? "bounce" : ""}
            data-color={favorite && color ? "ember" : ""}
          >
            <IconHeart size={20} fill={favorite} />
          </group>

          <text data-weight="700">
            {/* <Count 
  key={`${itemKey}-${favorite}`}
  from={favorite ? count : 0} 
  to={favorite ? displayCount : count} 
  duration={1500} 
/> */}

            <text data-weight="700">{displayCount}</text>
          </text>
        </group>
      </Tooltip>
    </group>
  );
};

const ViewSwitch = [
  {
    key: "1",
    name: "ViewSwitch",
    value: "CardView",
    label: "Cards",
    icon: <IconViewWindow size={20} />,
  },
  {
    key: "2",
    name: "ViewSwitch",
    value: "ListView",
    label: "List",
    icon: <IconTableRows size={20} />,
  },
  {
    key: "3",
    name: "ViewSwitch",
    value: "GridView",
    label: "Grid",
    icon: <IconViewStream size={20} />,
  },
];

const CardTemplate: React.FC<TemplateProps> = ({
  selectedKey,
  selectedRef,
  onSelect,
  onOpenModalRequest,
}) => {
  const [pressTimer, setPressTimer] = React.useState<NodeJS.Timeout | null>(
    null,
  );
  const [isPressing, setIsPressing] = React.useState(false);

  const handleLongPress = (item: any) => {
    // Trigger modal on long press
    onOpenModalRequest(item.key);
  };

  const handleTouchStart = (item: any) => {
    setIsPressing(true);
    setPressTimer(
      setTimeout(() => {
        setIsPressing(false); // Ensure the state is updated after delay
        handleLongPress(item); // Call long press action after delay
      }, 500), // 1000 ms = 1 second for long press
    );
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer); // Clear the timer if the user releases early
    }
    setIsPressing(false);
  };

  const handleTouchMove = () => {
    // Optionally handle touch move, to clear the timer if the user drags the finger
    if (pressTimer) {
      clearTimeout(pressTimer); // Clear the timer if the user moves their finger
    }
    setIsPressing(false);
  };

  return (
    <>
      {ContentData.map((item, index) => (
        <group
          data-background={
            selectedKey === item.key ? "context" : "main-background"
          }
          key={item.key}
          ref={
            selectedKey === item.key
              ? selectedRef
              : index === 0
                ? selectedRef
                : null
          }
          data-space="5"
          //data-gap="5"
          data-radius="30"
          data-direction="column"
          // data-border="outline"
          //  data-name="card"
          data-index={selectedKey === item.key ? "2" : ""}
          data-elevation={selectedKey === item.key ? "2" : ""}
          className={selectedKey === item.key ? "selected" : ""}
          onClick={() => onSelect(item.key)}
          data-interactive=""
          data-over-color="neutral"
          data-react="scale"
          data-cursor="pointer"
          onDoubleClick={() => onOpenModalRequest(item.key)}
          onTouchStart={() => handleTouchStart(item)} // Use onTouchStart for touch event
          onTouchEnd={handleTouchEnd} // Use onTouchEnd for touch release
          onTouchMove={handleTouchMove} // Optional: Handle touch move to cancel long press
          data-animation-name="zoom-in"
          data-fill-mode="backwards"
          data-animation-duration={2 + index * 0.5}
          data-animation-timing="fancy"
        >
          <group
            data-ratio="4:7"
            data-contain=""
            data-direction="column"
            data-wrap="no"
            //  data-gap="5"
            data-radius="25"
          >
            <picture
              style={{
                backgroundColor: item.dominantDark,
              }}
              //  data-position="absolute"
              data-brightness="adaptive"
              //    data-mask={selectedKey === item.key ? "bottom" : ""}
            >
              <img
                src={item.image_1x}
                srcSet={`${item.image} 2x`}
                alt={item.title}
              />
            </picture>

            {item.video && selectedKey === item.key && (
              <video
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

            <group
              //  data-space="5"
              data-direction="column"
              data-position="absolute"
              data-bottom="0"
              data-left="0"
            >
              <group
                // data-backdrop="20-adaptive"
                data-contain=""
                // data-radius="20"
                data-color="white"
                //  data-gradient="transparent-black"
                style={{
                  background: `linear-gradient(
      to bottom,
      transparent,
      ${item.dominantDark}
      
    )`,
                }}
              >
                <group
                  data-space-top="40"
                  data-space-vertical="20"
                  data-direction="column"
                >
                  {item.video && selectedKey != item.key && (
                    <group data-color="white" data-space="15">
                      {" "}
                      <Film size={20} />{" "}
                    </group>
                  )}
                  <text
                    data-space-horizontal="20"
                    data-text-size="medium-small"
                    data-ellipsis=""
                    data-font-type="hero"
                  >
                    {item.title}
                  </text>
                  <Marquee
                    data-space-horizontal="20"
                    data-disabled="true"
                    auto={selectedKey === item.key ? true : false}
                  >
                    <text
                      data-opacity={selectedKey === item.key ? "100" : "40"}
                      //  data-wrap="wrap"
                      data-ellipsis=""
                    >
                      {item.description}
                    </text>
                  </Marquee>
                </group>

                <group
                  data-width="auto"
                  data-height={selectedKey === item.key ? "60" : "0"}
                  data-transition-prop="height"
                  data-duration=".125"
                >
                  <group data-space-horizontal="15">
                    <separator data-horizontal=""></separator>
                  </group>
                  <group
                    //    data-background="context"
                    //   data-radius="15"
                    data-space="10"
                    //   data-index="2"
                    //  data-width="auto"
                  >
                    {selectedKey === item.key && (
                      <ContentToolbar
                        count={item.count}
                        itemKey={item.key}
                        itemTitle={item.title}
                        imageUrl={item.image}
                        color
                      />
                    )}
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      ))}
    </>
  );
};

const ListTemplate: React.FC<TemplateProps> = ({
  selectedKey,
  selectedRef,
  onSelect,
  onOpenModalRequest,
}) => {
  return (
    <>
      {ContentData.map((item, index) => (
        <group
          data-max-length="700"
          key={item.key}
          ref={
            selectedKey === item.key
              ? selectedRef
              : index === 0
                ? selectedRef
                : null
          }
          data-space="5"
          data-gap="5"
          data-radius="15"
          // data-direction="column"
          // data-border=""
          data-wrap="no"
          className={selectedKey === item.key ? "selected" : ""}
          onClick={() => onSelect(item.key)}
          data-interactive=""
          data-cursor="pointer"
          data-name="card"
          data-contain=""
          data-ink-color={selectedKey === item.key ? "main-dark" : ""}
          onDoubleClick={() => onOpenModalRequest(item.key)}
          data-animation-name="appear-left"
          data-fill-mode="backwards"
          data-animation-duration={1 + index * 0.5}
          // data-animation-timing="fancy"
        >
          <group
            data-ratio="1:1"
            data-length="60"
            data-radius="10"
            data-contain=""
            data-index="1"
          >
            <picture data-brightness="adaptive" data-object-position="top">
              <img src={item.thumbnail} alt={item.title} />
            </picture>
          </group>

          <group data-align="center" data-contain="">
            <group
              data-contain=""
              data-space="10"
              data-direction="column"
              data-index="1"
              //data-gap="5"
            >
              <text
                data-weight="700"
                // data-text-size="medium"
                data-wrap="wrap"
              >
                {item.title}
              </text>
              <text data-opacity="60" data-ellipsis="">
                {item.description}
              </text>
            </group>

            {selectedKey === item.key && (
              <ContentToolbar
                count={item.count}
                itemKey={item.key}
                itemTitle={item.title}
                imageUrl={item.image}
              />
            )}
          </group>
        </group>
      ))}
    </>
  );
};

const GridTemplate: React.FC<TemplateProps> = ({
  
  selectedKey,
  selectedRef,
  onSelect,
  onOpenModalRequest,
}) => {

 //   const [isMenuOpen, setIsMenuOpen] = useState(true);


  return (
    <>
      {ContentData.map((item, index) => (
        <group
          key={item.key}
          ref={
            selectedKey === item.key
              ? selectedRef
              : index === 0
                ? selectedRef
                : null
          }
          data-space="20"
          data-gap="15"
          //   data-radius="20"
          // data-direction="column"
          data-border=""
          data-name="card"
          data-interactive=""
          data-over-color="neutral"
          data-cursor="pointer"
          className={selectedKey === item.key ? "selected" : ""}
          onClick={() => {
            onSelect(item.key);
            //openCustomModal(item);
          }}
          onDoubleClick={() => onOpenModalRequest(item.key)}
        >
          <group data-wrap="no" data-align="start">
            <group
              data-height="60"
              data-length="60"
              data-radius="30"
              data-contain=""
              data-interact=""
            >
              <picture data-brightness="adaptive" data-object-position="top">
                <img src={item.thumbnail} alt={item.title} />
              </picture>
            </group>

            <group
              data-width="auto"
              data-position="right"
              onDoubleClick={(e: { stopPropagation: () => any }) =>
                e.stopPropagation()
              }
            >
              <Popover

            //  open={isMenuOpen}
            //  onOpenChange={setIsMenuOpen}

                content={
                  <ContentToolbar
                    count={item.count}
                    itemKey={item.key}
                    itemTitle={item.title}
                    imageUrl={item.image}
                    color
                  />
                }
                data-space="5"
                data-radius="15"
                //  trigger="contextmenu"
              >
                <group
                  data-space="10"
                  data-radius="10"
                  data-over-color="neutral-10"
                  data-interactive=""
                >
                  <IconMoreHoriz />
                </group>
              </Popover>
            </group>
          </group>

          <group data-gap="5" data-direction="column">
            <text
              data-weight="700"
              data-font-type="hero"
              data-text-size="medium-small"
              data-wrap="wrap"
            >
              {item.title}
            </text>
            <text data-opacity="60" data-wrap="wrap" data-line="1.4">
              {item.description}
            </text>
          </group>
        </group>
      ))}
    </>
  );
};



// Define a type for the views
type ViewTypes = "CardView" | "ListView" | "GridView";

// Mapping views to their templates and grid templates
const ViewTemplates: Record<
  ViewTypes,
  {
    component: React.FC<TemplateProps>;
    gridTemplate: string;
    gridGap: string;
    wrapperProps?: Record<string, string>;
  }
> = {
  CardView: { component: CardTemplate, gridTemplate: "200", gridGap: "5" },
  ListView: { component: ListTemplate, gridTemplate: "fit", gridGap: "5" },
  GridView: {
    component: GridTemplate,
    gridTemplate: "240",
    gridGap: "1",
    wrapperProps: {
      "data-radius": "30",
      "data-contain": "",
      "data-border": "",
    },
  },
};

// Define a type for the props that the template components will receive
type TemplateProps = {
  selectedKey: string;
  selectedRef: React.RefObject<HTMLDivElement>;
  onSelect: (key: string) => void;
  onOpenModalRequest: (key: string) => void; // Add this new prop
};

const Cards: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const openCustomModal = useOpenCustomModal();
  const [searchParams, setSearchParams] = useSearchParams();

  const lastOpenedKey = useRef<string | null>(null);

  useEffect(() => {
    const itemParam = searchParams.get("item");

    if (itemParam) {
      const item = ContentData.find((i) => i.key === itemParam);
      if (item && lastOpenedKey.current !== itemParam) {
        lastOpenedKey.current = itemParam;
        openCustomModal(item);
      }
    } else {
      if (lastOpenedKey.current) {
        closeModal(`modal-${lastOpenedKey.current}`);
        lastOpenedKey.current = null;
      }
    }
  }, [searchParams]);

  const savedView = localStorage.getItem("cards_view") as ViewTypes | null;

  const { control, watch } = useForm<FieldValues>({
    defaultValues: {
      ViewSwitch: savedView ?? "CardView",
    },
  });

  const view = watch("ViewSwitch") as ViewTypes; // Ensure the view type is correct
  const {
    component: ViewComponent,
    gridTemplate,
    gridGap,
    wrapperProps,
  } = ViewTemplates[view];

  const [selectedKey, setSelectedKey] = useState<string>("1");
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (key: string) => {
    setSelectedKey((prevKey) => (prevKey === key ? "" : key));
  };

  useEffect(() => {
    localStorage.setItem("cards_view", view);
  }, [view]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [view]);

  return (
    <>
      <group data-space="30">
        <TemplatePageHeader
          title="Cards & List"
          description="A card is an excellent tool for displaying content and actions related
    to a single subject, offering a cohesive presentation of multiple
    elements that vary in type and size."
        />

        <StuckReporter>
          {(isSticky) => (
            <group
              data-sticky="top"
              data-index="3"
              data-width="auto"
              data-space-vertical="30"
              data-space-horizontal={isSticky ? "30" : ""}
              data-duration=".125"
            >
              <group
                data-background="main-background"
                data-elevation={isSticky ? "1" : ""}
                data-backdrop={isSticky ? "20-adaptive" : ""}
                data-height="55"
                data-name="option-group"
                data-width="auto"
                data-space="5"
                data-border=""
                data-radius="15"
                data-contain=""
                data-weight="600"
              >
                {ViewSwitch.map((radio) => (
                  <Controller
                    key={radio.key}
                    name={radio.name}
                    control={control}
                    render={({ field }) => (
                      <Radio
                        {...field}
                        label={radio.label}
                        iconProps={{ "data-length": "30" }}
                        tooltip={
                          field.value === radio.value ? null : radio.label
                        }
                        tooltipProps={{ distance: 5 }}
                        labelProps={{ "data-background": "none" }}
                        // labelProps={{
                        //   "data-background": "none",

                        // }}
                        //     tooltip={radio.label}
                        icon={radio.icon}
                        radioValue={radio.value}
                        radioType={RadioType.Button}
                        checked={field.value === radio.value}
                      />
                    )}
                  />
                ))}
              </group>
            </group>
          )}
        </StuckReporter>

        {/* <separator data-horizontal=""></separator>
<group data-height="30"></group> */}
        <group
          data-type="grid"
          data-grid-template={gridTemplate}
          data-gap={gridGap}
          {...wrapperProps}
        >
          <ViewComponent
            selectedKey={selectedKey}
            onSelect={handleSelect}
            selectedRef={selectedRef}
            onOpenModalRequest={(key) => setSearchParams({ item: key })} // Pass the URL setter here
          />
        </group>
      </group>

      <group data-space="30">
        <group data-space="30">
          <text data-wrap="wrap" data-length="600" data-line="1.5">
            Please note, the subjects portrayed are entirely digital creations,
            crafted with precision. For more captivating visuals, an account on{" "}
            <Link
              data-link=""
              to="https://www.instagram.com/musesincode/"
              target="_blank"
            >
              Instagram
            </Link>{" "}
            holds them all
          </text>
        </group>
      </group>
    </>
  );
};

export default Cards;
