import React, { useState } from "react";
import DotDisplay from "../template/dotDisplay";
import DotDisplayEdit from "../template/dotDisplayEdit";







function Tools() {


  const [activeDots, setActiveDots] = useState<Set<number>>(
    new Set([
      131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 123, 106, 89, 155, 170,
      185, 72, 200,
    ])
  );

  const setsun = () => {
    setActiveDots(
      new Set([
        130, 129, 113, 114, 126, 125, 141, 142, 231, 232, 216, 215, 23, 24,
        40, 39, 51, 68, 75, 60, 187, 204, 180, 195, 196, 179, 203, 188, 76,
        59, 52, 67, 71, 72, 183, 184, 123, 139, 116, 132, 101, 86, 89, 106,
        154, 169, 166, 149, 165, 170, 90, 85, 117, 133, 150, 167, 168, 153,
        138, 122, 105, 88, 87, 102, 103, 118, 119, 120, 104, 121, 137, 136,
        135, 134, 151, 152,
      ])
    );
  };

  const setgear = () => {
    setActiveDots(
      new Set([
        55, 56, 124, 140, 115, 131, 199, 200, 165, 182, 185, 170, 155, 73, 90,
        107, 84, 69, 74, 91, 171, 184, 183, 181, 100, 70, 164, 85, 186, 154,
        138, 122, 106, 89, 72, 71, 86, 101, 116, 132, 148, 166, 167, 168, 88,
        87, 149, 117, 133, 139, 169, 123, 150, 102, 105, 153, 114, 130, 39, 40,
        125, 141, 216, 215, 187, 203, 188, 75, 59, 76, 68, 67, 52, 180, 179,
        196,
      ])
    );
  };

  const setmoon = () => {
    setActiveDots(
      new Set([
        115, 131, 164, 181, 186, 171, 199, 200, 54, 55, 56, 69, 84, 99, 156,
        140, 124, 71, 86, 102, 118, 135, 152, 153, 139, 154, 70, 85, 100, 101,
        116, 117, 132, 133, 134, 148, 150, 151, 149, 165, 166, 167, 168, 169,
        170, 155, 182, 183, 184, 185, 201, 198, 147, 180,
      ])
    );
  };


  return (
    <group data-space="30" data-gap="30" data-wrap="no">


<group data-direction="column" data-gap="10">
<group>
<DotDisplay activeIndexes={activeDots} />

</group>
        <group data-gap="5">
          <group
            data-width="auto"
            data-space="15"
            data-background="highlight"
            onClick={setsun}
          >
            <text>Sun</text>
          </group>

          <group
            data-width="auto"
            data-space="15"
            data-background="highlight"
            onClick={setgear}
          >
             <text>Gear</text>
          </group>
          <group
            data-width="auto"
            data-space="15"
            data-background="highlight"
            onClick={setmoon}
          >
             <text>Moon</text>
          </group>
        </group>

        <DotDisplayEdit isEditMode />
      </group>

    </group>
  );
}

export default Tools;
