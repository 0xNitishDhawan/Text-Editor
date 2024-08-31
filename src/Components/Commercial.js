import React from "react";
import Homebutton from "./Homebutton";
import Editor from "./Editor";

const Commercial = () => {
  return (
    <>
      <Homebutton/>
      <Editor editorHeading={"Revenue Performance Summary"}/>
      <hr/>
      <Editor editorHeading={"Commercial Opex Summary"}/>
      <hr/>
      <Editor editorHeading={"Revenue Breakdown"}/>
      <hr/>
      <Editor editorHeading={"Revenue R&Os vs. MBP 2024-26"}/>
      <hr/>
      <Editor editorHeading={"Opex R&Os vs. MBP 2024-26"}/>
      <hr/>
      
    </>
  );
};

export default Commercial;
