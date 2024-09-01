import React from "react";
import Homebutton from "./Homebutton";
import Button from "./Button";

const ButtonSection = ({handleClick, handleFetch}) => {
  return (
    <>
      <Homebutton />
      <div className="buttonSection">
        <Button handleClick={handleFetch} text={"Fetch Data"} />
        <Button handleClick={handleClick} text={"Convert to HTML"} />
      </div>
    </>
  );
};
export default ButtonSection