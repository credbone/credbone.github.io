import React from "react";

function Resume() {
  return (
    <view data-space="50" data-scroll="" data-border="no">
      <group data-gap="30" data-direction="column">
        <group data-direction="column" data-gap="10">
          <text
            data-weight="800"
            data-text-size="xxx-large"
            data-wrap="wrap"
            // data-opacity="20"
          >
            Ruben Sargsyan
          </text>
          <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
            Product Designer
          </text>
        </group>

        <group>
          <text data-wrap="wrap" data-max-length="600" data-line="20">
            As a Product Designer, I have led and grown a dedicated design team
            for the past decade with a strong background in the information
            technology and services industry. With extensive experience in
            digital{" "}
            <mark>complex products design across various industries</mark>, I
            focus on creating innovative and user-centered solutions.{" "}
            <mark>From prototype to final implementation</mark>, I ensure our
            designs are technically sound and effective.
          </text>
        </group>

        <group data-direction="column" data-width="auto" data-gap="10">
          <a href="tel:+37493080648" data-type="group" data-width="auto">
            <text
              data-wrap="wrap"
              data-weight="700"
              date-decoration="underline"
            >
              <mark> + 374 93 080 648</mark>
            </text>
          </a>

          <a
            href="mailto:sargsyanrubens@gmail.com"
            data-type="group"
            data-width="auto"
          >
            <text data-wrap="wrap" data-weight="600">
              sargsyanrubens@gmail.com
            </text>
          </a>

          <group>
            <text>Armenia, Yerevan</text>
          </group>
        </group>

        <separator data-horizontal="" data-max-length="600"></separator>

        <group data-gap="30">
          <text data-weight="700" data-text-size="x-large">
            Experience
          </text>

          <group data-gap="10">
            <text data-weight="700">Ogma</text>
            <dot></dot>
            <text>Design Department Manager</text>
            <dot></dot>
            <text>February 2014 - Present</text>
          </group>

          <group data-direction="column">
            <text data-wrap="wrap" data-max-length="600" data-line="20">
              I left my previous position at Altacode to join Ogma, where I
              started on a challenging project involving content creation,
              management software, and customized hardware solutions tailored to
              specific customer needs. After a successful launch, I had the
              chance to create a{" "}
              <mark>UI framework and a collection of components</mark>, working
              closely with involved design and development team members. This
              powerful internal tool helped us speed up our development
              processes significantly.
            </text>
          </group>

          <group data-gap="10">
            <text data-weight="700">Altacode</text>
            <dot></dot>
            <text>UI Designer</text>
            <dot></dot>
            <text>November 2011 - January 2014</text>
          </group>

          <group data-direction="column">
            <text data-wrap="wrap" data-max-length="600" data-line="20">
              This is my first job at a big company where I learned various
              business processes, including project management, team
              collaboration, and client communication. During this time, I had
              the opportunity to work on a variety of web and mobile products.
            </text>
          </group>
        </group>

        <separator data-horizontal="" data-max-length="600"></separator>

        <group data-gap="30">
          <text data-weight="700" data-text-size="x-large">
            Hard Skills
          </text>
        </group>

        <group data-gap="10">
          <group data-gap="10">
            <mark>
              <text data-weight="700">Prototyping</text>
            </mark>
            <dot></dot>
            <text>From Paper & Rapid to High-fidelity Markups</text>
          </group>

          <group data-gap="10">
            <text data-weight="700">Research</text>
            <dot></dot>
            <text>From User interviews to Creating and Managing Personas</text>
          </group>

          <group data-gap="10">
            <text data-weight="700">Coding</text>
            <dot></dot>
            <text>From Prototype to Reusable Components</text>
          </group>
        </group>

        <group data-gap="30">
          <text data-weight="700" data-text-size="x-large">
           Tools
          </text>
        </group>

      </group>
    </view>
  );
}

export default Resume;
