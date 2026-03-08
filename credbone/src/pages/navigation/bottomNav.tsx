import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./subroutesData";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { SvgWaves } from "../../components/icon/svgRes";


const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentIndex = navItems.findIndex((item) =>
    location.pathname.includes(item.to),
  );

  const prevItem = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  const isLastItem = currentIndex === navItems.length - 1;

  return (
    <group data-space="30" data-gap="30">
  
  <group data-opacity="30">
    <SvgWaves/>
  </group>



      <group data-wrap="no" data-space-vertical="30" data-align="center">
        {prevItem && (
          <>

              <Link
                data-ink-color="neutral"
                data-contain=""
                data-interactive=""
                data-over-color="neutral"
                data-type="group"
                data-width="auto"
                //  data-border=""
                data-background="text"
                data-color="main-background"
                data-space="20"
                data-radius="60"
                data-gap="15"
                data-drag="none"
                data-wrap="no"
                data-shrink="no"
                to={`/${prevItem.to}`}
                data-index="1"
                //  data-min-length={isLastItem ? "200" : undefined}
                data-length={isLastItem ? "forcefit" : undefined}
              >
                <group
                  //data-height="fit"
                  data-align="center"
                  data-justify="center"
                  data-length="30"
                  data-height="30"
                  data-interact=""
                >
                  <ChevronLeft strokeWidth={1.5} />
                </group>

                {isLastItem && (
                  <group
                    data-direction="column"
                    data-width="auto"
                    data-contain=""
                    data-space-right="10"
                  >
                                        <text data-opacity="30">Previous</text>
                    <text data-weight="700" data-ellipsis="">
                      {prevItem.label}
                    </text>

                  </group>
                )}
              </Link>


            <group data-hide={isLastItem ? "true" : ""} data-width="auto" data-margin-horizontal="-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="42"
                viewBox="0 0 24 42"
                fill="none"
              >
                <path
                  data-fill="text"
                  d="M24 41.999C22.8167 40.4234 21.7622 38.7454 20.8545 36.9795C19.1046 33.575 15.8279 31 12 31C8.17214 31 4.89544 33.575 3.14551 36.9795C2.23779 38.7454 1.1833 40.4234 0 41.999V0C1.18349 1.57576 2.23767 3.25436 3.14551 5.02051C4.89544 8.42495 8.17214 11 12 11C15.8279 11 19.1046 8.42495 20.8545 5.02051C21.7623 3.25436 22.8165 1.57576 24 0V41.999Z"
                />
              </svg>
            </group>
          </>
        )}

        {nextItem && (
            <Link
              data-index="1"
              //   data-min-length="200"
              data-ink-color="neutral"
              data-contain=""
              //   data-background="adaptive-gray"
              data-interactive=""
              data-over-color="neutral"
              data-type="group"
              data-width="auto"
              data-length="forcefit"
              data-background="text"
              data-color="main-background"
              data-space="20"
              data-radius="60"
              data-gap="15"
              data-drag="none"
              data-wrap="no"
              to={`/${nextItem.to}`}
            >
              <group
                data-space-horizontal="10"
                data-direction="column"
                data-width="auto"
                data-contain=""
              >
                                <text data-opacity="30">Next</text>
                <text data-weight="700" data-ellipsis="">
                  {nextItem.label}
                </text>

              </group>

              <group
                data-position="right"
                data-height="30"
                data-align="center"
                data-justify="center"
                data-interact=""
                data-length="30"
              >
                <ChevronRight strokeWidth={1.5} />
              </group>
            </Link>
        )}
      </group>
    </group>
  );
};

export default BottomNav;
