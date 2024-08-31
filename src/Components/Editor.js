import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const textModule = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};
const dateModule = {
  toolbar: false,
};

const Editor = ({editorHeading, date, setDate, value, setValue}) => {

  return (
    <>
      <div className="editorSection">
        <div className="fiscalPeriodSection">
          <h3 style={{marginBottom:"27px"}}>Fiscal Period</h3>
          <div className="dateSection">
            <ReactQuill value={date} onChange={setDate} modules={dateModule} placeholder="Enter Fiscal Period"/>
          </div>
        </div>
        <div className="textSection">
          <h2 >{editorHeading}</h2>
          <ReactQuill value={value} onChange={setValue} modules={textModule} placeholder="Please enter the formatted text for commentary here." />
        </div>
      </div>
    </>
  );
};

export default Editor;
