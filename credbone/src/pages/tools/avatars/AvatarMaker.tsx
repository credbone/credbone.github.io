import React, { useState, useRef, useEffect } from "react";
import { avatars } from "./avatars";
import Ripple from "../../../components/Ripple";
import CustomSlider from "../../../components/inputs/slider";
import { SvgPattern_1 } from "../../../components/icon/svgRes";
import Popover from "../../../components/popover";
import { HexColorPicker } from "react-colorful";

import { Link2, ArrowDown, Copy, Share, SmilePlus, Radius } from "lucide-react";
import { useSnackbar } from "../../../components/snackbar/SnackbarContainer";
import MenuItem from "../../../components/MenuItem";
import Scroll from "../../../components/scroll";

const defaultIndex = 1;
const defaultRadius = 256;
const defaultBgColor = avatars[0].color;

const isValidHex = (color: string) => /^#?([a-f\d]{6})$/i.test(color);

const parseUrlParams = () => {
  const params = new URLSearchParams(window.location.search);

  const indexParam = params.get("avatar");
  const radiusParam = params.get("radius");
  const colorParam = params.get("color");

  let index = defaultIndex;
  if (indexParam !== null) {
    const parsed = parseInt(indexParam, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed < avatars.length) {
      index = parsed;
    }
  }

  let radius = defaultRadius;
  if (radiusParam !== null) {
    const parsed = parseInt(radiusParam, 10);
    if (!isNaN(parsed)) {
      radius = Math.max(220, Math.min(310, parsed));
    }
  }

  let bgColor = avatars[index].color;
  if (colorParam !== null) {
    const hex = `#${colorParam}`;
    if (isValidHex(hex)) {
      bgColor = hex;
    }
  }

  return { index, radius, bgColor };
};

const AvatarMaker: React.FC = () => {
  const { addSnackbar } = useSnackbar();

  const initial = parseUrlParams();

  const [selected, setSelected] = useState(avatars[initial.index]);
  const [selectedIndex, setSelectedIndex] = useState(initial.index);
  const [radius, setRadius] = useState(initial.radius);
  const [tempRadius, setTempRadius] = useState(initial.radius);
  const [bgColor, setBgColor] = useState(initial.bgColor);

  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(
    new Set([avatars[initial.index].key]),
  );
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    avatars.forEach((avatar) => {
      fetch(avatar.image_3x, { cache: "force-cache" })
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setBlobUrls((prev) => ({ ...prev, [avatar.key]: url }));
        })
        .catch(() => {});
    });

    return () => {
      setBlobUrls((prev) => {
        Object.values(prev).forEach(URL.revokeObjectURL);
        return {};
      });
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [hasChanged, setHasChanged] = useState(false);

  const imageRef = useRef<SVGImageElement>(null);
  const animFrameRef = useRef<number>(0);

  const selectedIndexRef = useRef(initial.index);
  const radiusRef = useRef(initial.radius);
  const bgColorRef = useRef(initial.bgColor);

  const getImageY = (r: number) => Math.round((-54 * (310 - r)) / (310 - 256));

  const animateImageY = (from: number, to: number) => {
    cancelAnimationFrame(animFrameRef.current);
    const start = performance.now();
    const duration = 400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const y = from + (to - from) * ease;
      if (imageRef.current)
        imageRef.current.setAttribute("y", String(Math.round(y)));
      if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const updateURL = () => {
    const params = new URLSearchParams();

    if (selectedIndexRef.current !== defaultIndex) {
      params.set("avatar", String(selectedIndexRef.current));
    }
    if (radiusRef.current !== defaultRadius) {
      params.set("radius", String(radiusRef.current));
    }
    if (bgColorRef.current !== avatars[selectedIndexRef.current].color) {
      params.set("color", bgColorRef.current.replace("#", ""));
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  };

  const checkHasChanged = (index: number, r: number, color: string) => {
    return (
      index !== defaultIndex ||
      r !== defaultRadius ||
      color !== avatars[index].color
    );
  };

  // debounce radius → commit + URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setRadius(tempRadius);
      radiusRef.current = tempRadius;
      updateURL();
    }, 150);
    return () => clearTimeout(timer);
  }, [tempRadius]);

  // sync tempRadius when reset changes radius externally
  useEffect(() => {
    setTempRadius(radius);
  }, [radius]);

  useEffect(() => {
    if (checkHasChanged(selectedIndex, tempRadius, bgColor)) {
      setHasChanged(true);
    }
  }, [selectedIndex, tempRadius, bgColor]);

  const handleSelect = (avatar: (typeof avatars)[0], index: number) => {
    if (index === selectedIndex) return;

    const run = (animate: boolean) => {
      if (animate) {
        const targetY = getImageY(tempRadius);
        animateImageY(targetY + 40, targetY);
      }
      setSelected(avatar);
      setSelectedIndex(index);
      const newColor = avatar.color;
      setBgColor(newColor);
      selectedIndexRef.current = index;
      bgColorRef.current = newColor;
      updateURL();
      setIsLoading(false);
    };

    if (blobUrls[avatar.key]) {
      run(true);
    } else {
      setIsLoading(true);
      fetch(avatar.image_3x, { cache: "force-cache" })
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setBlobUrls((prev) => ({ ...prev, [avatar.key]: url }));
          run(false);
        })
        .catch(() => setIsLoading(false));
    }
  };

  const handleRadiusChange = (value: number) => {
    setTempRadius(value);
  };

  const handleColorChange = (color: string) => {
    setBgColor(color);
    bgColorRef.current = color;
  };

  const resetValues = () => {
    const avatar = avatars[defaultIndex];
    setSelected(avatar);
    setSelectedIndex(defaultIndex);
    setRadius(defaultRadius);
    setTempRadius(defaultRadius);
    setBgColor(avatar.color);
    setHasChanged(false);

    selectedIndexRef.current = defaultIndex;
    radiusRef.current = defaultRadius;
    bgColorRef.current = avatar.color;
    updateURL();
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addSnackbar("Link copied to clipboard", 1000);
    } catch {
      addSnackbar("Failed to copy link", 1000);
    }
  };

  const imageY = getImageY(tempRadius);

  const svgToPng = (): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      //  img.crossOrigin = "anonymous";
      img.onload = () => {
        const offscreen = document.createElement("canvas");
        offscreen.width = img.naturalWidth;
        offscreen.height = img.naturalHeight;
        const offCtx = offscreen.getContext("2d");
        offCtx?.drawImage(img, 0, 0);

        let dataUrl: string;
        try {
          dataUrl = offscreen.toDataURL("image/png");
        } catch {
          reject(new Error("Cross-origin taint"));
          return;
        }

        const maxPad = 60;
        const pad = Math.round(maxPad * (1 - (tempRadius - 220) / (310 - 220)));
        const vx = -pad;
        const vy = -pad;
        const vw = 620 + pad * 2;
        const vh = 620 + pad * 2;

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="${vx} ${vy} ${vw} ${vh}" fill="none">
  <defs>
    <clipPath id="avatar-export" clipPathUnits="userSpaceOnUse">
      <rect x="0" y="-70" width="620" height="320" />
      <circle cx="310" cy="310" r="${tempRadius}" />
    </clipPath>
  </defs>
  <circle cx="310" cy="310" r="${tempRadius}" fill="${bgColor}" />
  <image x="0" y="${imageY}" width="620" height="620" clip-path="url(#avatar-export)" href="${dataUrl}" />
</svg>`;

        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const finalImg = new Image();
        finalImg.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext("2d");

          const currentDateTime = new Date()
            .toISOString()
            .replace(/[^\w]/g, "")
            .slice(0, 15);

          ctx?.drawImage(finalImg, 0, 0, 512, 512);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (blob)
              resolve(
                new File(
                  [blob],
                  `avatar-${selected.key}-${currentDateTime}.png`,
                  { type: "image/png" },
                ),
              );
            else reject();
          }, "image/png");
        };
        finalImg.onerror = () => {
          URL.revokeObjectURL(url);
          reject();
        };
        finalImg.src = url;
      };
      img.onerror = reject;
      img.src = blobUrls[selected.key] ?? selected.image_3x;
    });
  };

  const downloadPNG = async () => {
    try {
      const file = await svgToPng();
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");

      const currentDateTime = new Date()
        .toISOString()
        .replace(/[^\w]/g, "")
        .slice(0, 15);

      a.href = url;
      a.download = `avatar-${selected.key}-${currentDateTime}.png`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      URL.revokeObjectURL(url);
    } catch {
      addSnackbar("Failed to download", 1000);
    }
  };

  const copyPNG = async () => {
    try {
      const file = await svgToPng();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": file }),
      ]);
      addSnackbar("Image copied to clipboard", 1000);
    } catch {
      addSnackbar("Failed to copy image", 1000);
    }
  };

  const handleNativeShare = async () => {
    if (!("share" in navigator)) return;
    const shareData: ShareData = { url: window.location.href };
    try {
      const file = await svgToPng();
      if (navigator.canShare?.({ files: [file] })) shareData.files = [file];
    } catch {
      // share URL only
    }
    try {
      await navigator.share(shareData);
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") console.error(err);
    }
  };

  const menuItems = [
    ...("share" in navigator
      ? [
          {
            icon: <Share strokeWidth={1.5} size={20} />,
            title: "Share",
            description: "Send avatar via...",
            onClick: handleNativeShare,
          },
        ]
      : []),
    {
      icon: <ArrowDown strokeWidth={1.5} size={20} />,
      title: "Download",
      description: "Save as PNG",
      onClick: downloadPNG,
    },
    {
      icon: <Copy strokeWidth={1.5} size={20} />,
      title: "Copy",
      description: "Paste anywhere",
      onClick: copyPNG,
    },
    {
      icon: <Link2 strokeWidth={1.5} size={20} />,
      title: "Share Link",
      description: "Copy URL for sharing",
      onClick: copyShareLink,
    },
  ];

  useEffect(() => {
    setHasChanged(
      checkHasChanged(initial.index, initial.radius, initial.bgColor),
    );
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const bottomsheetConfig = {
    "data-space": "0",
    // "data-background" : "main-background"
  };

  const avatarGrid = (
    prefix: string,
    itemProps?: React.HTMLAttributes<HTMLElement> & { [key: string]: any },
  ) => (
    <>
      {avatars.map((avatar, index) => (
        <group
          key={avatar.key}
          data-border=""
          data-background={selectedIndex === index ? "adaptive-gray" : ""}
          onClick={() => handleSelect(avatar, index)}
          data-cursor="pointer"
          {...itemProps}
        >
          <Ripple>
            <group
              data-contain=""
              data-space="30"
              data-interactive=""
              data-over-color="neutral"
              data-ink-color="neutral"
              data-gap="10"
            >
              <group data-interact="">
                <svg
                  data-contain="visible"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 620 620"
                  fill="none"
                >
                  <defs>
                    <clipPath
                      id={`${prefix}-${avatar.key}`}
                      clipPathUnits="userSpaceOnUse"
                    >
                      <rect x="0" y="-54" width="620" height="310" />
                      <circle cx="310" cy="310" r="256" />
                    </clipPath>
                  </defs>
                  <circle cx="310" cy="310" r="256" fill={avatar.color} />
                  <image
                    x="0"
                    y="-54"
                    width="620"
                    height="620"
                    clipPath={`url(#${prefix}-${avatar.key})`}
                    href={avatar.image_2x}
                  />
                </svg>
              </group>
              <group data-align="center" data-direction="column">
                <text data-weight="600">{avatar.name}</text>
                <text data-opacity="40" data-ellipsis="">
                  {avatar.description}
                </text>
              </group>
            </group>
          </Ripple>
        </group>
      ))}
    </>
  );

  const [isColorOpen, setIsColorOpen] = useState(false);


  return (
    <group data-wrap="no" data-gap="30" data-align="start">
      <group
        data-position="sticky"
        data-top="30"
        data-direction="column"
        data-align="start"
        data-gap="20"
        data-autofit="1-800"
        data-length="395"
      >
        <group
          data-space="30"
          data-shrink="no"
          data-elevation="2"
          //    data-gap="30"
          data-direction="column"
          data-align="start"
          data-background="context"
          data-radius="40"
          data-contain=""
        >
          <SvgPattern_1 />
          <group data-wrap="no" data-align="center">
            <group data-direction="column">
              <text
                data-text-size="medium"
                data-ellipsis=""
                data-font-type="hero"
              >
                {selected.name}
              </text>
              <text data-opacity="40">{selected.description}</text>
            </group>

            <Popover
              //   bottomsheet
              //    placement="right"

              data-space="5"
              data-radius="0"
              data-elevation="0"
              data-contain="visible"
              data-background="none"
              open={isColorOpen}
              onOpenChange={(isOpen) => {
                if (!isOpen) updateURL();
                setIsColorOpen(isOpen);
              }}
              content={(closePopover) => (
                <group data-width="auto" data-direction="column" data-gap="5">
                  <group
                    data-animation-name="appear-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="2.25"
                    data-elevation="2"
                    data-index="3"
                    data-background="context"
                    data-space="5"
                    data-radius="20"
                    data-direction="column"
                    data-name="cred-react-colorful"
                    data-width="auto"
                    data-gap="5"
                  >
                    <HexColorPicker
                      color={bgColor}
                      onMouseUp={updateURL}
                      onTouchEnd={updateURL}
                      onChange={handleColorChange}
                    />
                  </group>

                  {/* <group


              data-animation-name="appear-top"
                    data-fill-mode="backwards"
                    data-animation-duration="3.75"
           

            data-space="5"
            data-radius="20"
            data-elevation="2"
            data-background="context"
            data-direction="column"
            data-align="center"
            //  data-gap="5"
          >

                            <group
                              data-name="autoseparation"
                              data-align="center"
                              data-direction="column"
                            >
                              <separator
                                data-horizontal=""
                                data-max-length="100"
                              ></separator>
                              <Ripple>
                                <group
                                  data-contain=""
                                  data-ink-color="neutral"
                                  data-space="15"
                                  data-interactive=""
                                  data-over-color="neutral"
                                  data-cursor="pointer"
                                  data-radius="15"
                                  data-align="center"
                                  data-wrap="no"
                                  data-justify="center"
                                  data-gap="10"
                                  onClick={() => {
                                   
                                    closePopover();
                                  }}
                                >
                                  <group data-width="auto">
                                    <text>Done</text>
                                  </group>
                                </group>
                              </Ripple>
                            </group>
</group> */}
                </group>
              )}
            >
              <group data-width="auto">
                <Ripple>
                  <group
                    data-ink-color="neutral"
                    data-contain=""
                    data-width="auto"
                    data-over-color="neutral"
                    data-space="10"
                    data-interactive=""
                    data-cursor="pointer"
                    data-align="center"
                    data-wrap="no"
                    data-radius="30"
                  >
                    <group
                      data-interact=""
                      data-length="30"
                      data-height="30"
                      data-radius="30"
                      data-border="outline-soft"
                      style={{ backgroundColor: bgColor }}
                    />
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>

          <group data-contain="" data-align="start" data-direction="column">
            <group data-space="30">
              <svg
                data-contain="visible"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 620 620"
                fill="none"
              >
                <defs>
                  <clipPath
                    id={`avatar-preview-${selected.key}`}
                    clipPathUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="-70" width="620" height="320" />
                    <circle cx="310" cy="310" r={tempRadius} />
                  </clipPath>
                </defs>

                <circle cx="310" cy="310" r={tempRadius} fill={bgColor} />
                <image
                  ref={imageRef}
                  x="0"
                  y={imageY}
                  width="620"
                  height="620"
                  clipPath={`url(#avatar-preview-${selected.key})`}
                  href={blobUrls[selected.key] ?? selected.image_3x}
                />
              </svg>

              {/* {isLoading && (
    <group
      data-position="absolute"
      data-top="0"
      data-left="0"
      data-contain=""
      data-align="center"
      data-justify="center"
      data-background=""
    >
      <group
        data-width="auto"
        data-animation-name="rotate"
        data-animation-duration="8"
        data-animation-repeat="infinite"
        data-animation-timing="linear"
      >
        loading
      </group>
    </group>
  )} */}
            </group>
          </group>

          {/* <group data-align="center" data-justify="center" data-gap="10">


            <separator data-vertical=""></separator>

          {demo_colors.map((c) => (
            <group key={c.value} data-width="auto">
              <Ripple>
                <group
                  data-background={bgColor === c.value ? "adaptive-gray" : undefined}
                  data-ink-color="neutral"
                  data-contain=""
                  data-width="auto"
                  data-over-color="neutral"
                  data-space="10"
                  data-interactive=""
                  data-cursor="pointer"
                  data-align="center"
                  data-wrap="no"
                  data-radius="30"
                 onClick={() => { handleColorChange(c.value); updateURL(); }}
                >
                  <group
                    data-interact=""
                    data-length="25"
                    data-height="25"
                    data-radius="25"
                    data-border="outline-soft"
                    style={{ backgroundColor: c.value }}
                  />
                </group>
              </Ripple>
            </group>
          ))}
          </group> */}

          <group
            onMouseDown={() => {
              setIsColorOpen(false);
           
            }}
            onTouchStart={() => {
              setIsColorOpen(false);

            }}
            data-gap="30"
          >
            <group  data-position="center" data-length="260" data-wrap="no" data-gap="15" data-align="center">
              <text>Size</text>
              <separator data-vertical=""></separator>
              <CustomSlider
                showvalue={false}
                handlerWidth={50}
               // edgeGap={30}
                start={220}
                end={310}
                value={tempRadius}
                onValueChange={handleRadiusChange}
                handlerProps={{ "data-animation-name": "slider-smooth" }}
                trackLeftProps={{
                  "data-margin-right": "0",
                  "data-height": "1",
                }}
                trackRightProps={{
                  "data-opacity": "10",
                  "data-margin-left": "5",
                  "data-height": "1",
                }}
              />
               <text data-font-feature="tnum" data-opacity="30">{tempRadius}</text>
            </group>

            <group data-adaptive="mobile" data-contain="">
              <Popover
                bottomsheet
                dim={false}
                bottomsheetProps={bottomsheetConfig}



                placement="middle"
                data-space="0"
                data-radius="30"
                data-length="600"
                content={(closePopover, isBottomSheet) => (
                  <group data-direction="column" data-wrap="no" data-contain="">
                    <group
                      data-scroll-mask="false"
                      data-contain=""
                      data-radius-top="30"
                    >
                      <Scroll
                        wheelEnabled
                        buttonProps={{
                          "data-hide": "true",
                        }}
                      >
                        <group data-wrap="no" data-gap="1">
                          {avatarGrid("grid-b", { "data-length": "160" })}
                        </group>
                      </Scroll>
                    </group>
                    <group data-space-horizontal="20">
                      <separator data-horizontal=""></separator>
                    </group>
                    <group
                      data-wrap="no"
                      data-align="center"
                      data-space="30"
                      data-gap="10"
                    >
                      {/* <group
                        data-cursor="pointer"
                        data-interactive=""
                        data-space-vertical="15"
                        data-radius="30"
                        data-space-horizontal="30"
                        data-background="adaptive-gray"
                        onClick={resetValues}
                        data-width="auto"
                      >
                        <text>Clear</text>
                      </group> */}

                      <group
                        data-cursor="pointer"
                        data-interactive=""
                        data-space-vertical="15"
                        data-radius="30"
                        data-space-horizontal="20"
                        data-background="text"
                        data-color="main-background"
                        onClick={closePopover}
                        data-align="center"
                        data-justify="center"
                        data-weight="600"
                      >
                        <text>Done</text>
                      </group>
                    </group>
                  </group>
                )}
              >
                <group data-contain="">
                  <Ripple>
                    <group
                      data-contain=""
                      data-space="25"
                      data-radius="30"
                      data-justify="center"
                      data-background="adaptive-gray"
                      data-interactive=""
                      data-over-color="neutral"
                      data-direction="column"
                      data-cursor="pointer"
                      data-gap="10"
                      //   data-width="auto"
                    >
                      <group data-interact="">
                        <SmilePlus strokeWidth={1.5} />
                      </group>

                      <text data-ellipsis="">Change Character</text>
                    </group>
                  </Ripple>
                </group>
              </Popover>
            </group>

            <group data-wrap="no" data-gap={hasChanged ? "10" : undefined}>
              <Popover
                //   placement="bottom"
                bottomsheet
                data-space="5"
                data-radius="20"
 
                content={(closePopover, isBottomSheet) => (
                  <group
                    data-direction="column"
                    data-length="250"
                    onClick={closePopover}
                    data-contain=""
                  >
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
                )}
              >
                <group data-fit="2">
                  <Ripple>
                    <group
                      data-contain=""
                      data-space="15"
                      data-align="center"
                      data-justify="center"
                      data-background="text"
                      data-interactive=""
                      data-over-color="neutral"
                      data-color="main-background"
                      data-radius="30"
                      data-cursor="pointer"
                      data-weight="600"
                    >
                      <text>Export</text>
                    </group>
                  </Ripple>
                </group>
              </Popover>

              <group
                data-fit={hasChanged ? "1" : "0"}
                data-contain=""
                data-duration=".225"
                data-transition-prop="flex"
                data-gap="15"
                data-position="right"
              >
                <Ripple>
                  <group
                    data-opacity={hasChanged ? undefined : "0"}
                    data-duration=".225"
                    data-transition-prop="opacity"
                    data-contain=""
                    data-space="15"
                    data-space-horizontal="25"
                    data-justify="center"
                    data-interactive=""
                    data-over-color="neutral"
                    data-background="adaptive-gray"
                    data-radius="30"
                    data-cursor="pointer"
                    onClick={resetValues}
                  >
                    <text>Reset</text>
                  </group>
                </Ripple>
              </group>
            </group>
          </group>
        </group>
      </group>

      <group
        data-wrap="no"
        data-gap="1"
        data-contain=""
        data-border=""
        data-radius="40"
        data-adaptive="desktop"
      >
        <group
          data-type="grid"
          data-gap="1"
          data-grid-template="180"
          data-contain=""
        >
          {avatarGrid("grid-a")}
        </group>
      </group>
    </group>
  );
};

export default AvatarMaker;
