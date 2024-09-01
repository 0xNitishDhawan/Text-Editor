import React from "react";
import ButtonSection from "./SubComponent/ButtonSection"
import Editor from "./SubComponent/Editor";

const Commercial = () => {
  return (
    <>
      <ButtonSection/>
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
