import React from "react";

type HeaderProps = {
  title: string;
  description: string;
  version?: string;
  type?: string;
  descriptionProps?: Record<string, string>;
};

const TemplatePageHeader: React.FC<HeaderProps> = ({
  title,
  description,
  version,
  type,
  descriptionProps,
}) => {
  return (
    <group
      data-direction="column"
      data-gap="30"
      data-background="adaptive-gray"
      
      data-radius="40"
      data-justify="end"
      data-space="30"
      data-contain=""
       data-align="start"
    >
      {(version || type) && (
        <>
          <group data-direction="column" data-gap="30" data-align="start"  data-width="auto" >
            <group data-gap="20" data-align="center"  data-wrap="no" data-width="auto" >
              {type && (
                <group
                
                  data-space-horizontal="20"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                   data-contain=""
                >
                  <text data-ellipsis="">{type}</text>
                </group>
              )}
              {version && <separator data-vertical=""></separator>}
              {version && <text>Version {version}</text>}
            </group>

                      <separator data-horizontal="" ></separator>
          </group>

        </>
      )}
      <group data-height="100" data-adaptive="desktop"></group>
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xx-large"
          data-wrap="wrap"
          data-ellipsis=""
          data-font-type="hero"
        >
          {title}
        </text>
        <text
          data-wrap="wrap"
          data-length="400"
          data-line="1.5"
          {...descriptionProps}
        >
          {description}
        </text>
      </group>
    </group>
  );
};

export default TemplatePageHeader;
