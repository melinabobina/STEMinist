import SelectionWindow from "./SelectionWindow";
import "./CharacterSection.css";

import React, { useState } from "react";

function CharacterSection() {
  const [color, setColor] = useState("red");
    
  return (
    <div className="selection-container">
        <div>
            \\\\
        </div>
        <SelectionWindow><div>hello</div></SelectionWindow>
        <SelectionWindow><div>byte</div></SelectionWindow>
        <div>
            ////
        </div>
    </div>
  );
}

export default CharacterSection;