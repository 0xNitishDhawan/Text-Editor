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

const Editor = ({ editorHeading, date, setDate, value, setValue }) => {
  return (
    <>
      <div className="editorSection">
        <div className="fiscalPeriodSection">
          <h3 style={{ marginBottom: "27px" }}>Fiscal Period</h3>
          <div className="dateSection">
            <select
              id="date"
              name="Fiscal Period"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="Jan-24">Jan-24</option>
              <option value="Feb-24">Feb-24</option>
              <option value="Mar-24">Mar-24</option>
              <option value="Apr-24">Apr-24</option>
              <option value="May-24">May-24</option>
              <option value="Jun-24">Jun-24</option>
              <option value="Jul-24">Jul-24</option>
              <option value="Aug-24">Aug-24</option>
              <option value="Sept-24">Sept-24</option>
              <option value="Oct-24">Oct-24</option>
              <option value="Nov-24">Nov-24</option>
              <option value="Dec-24">Dec-24</option>
            </select>
          </div>
        </div>
        <div className="textSection">
          <h2>{editorHeading}</h2>
          <ReactQuill
            value={value}
            onChange={setValue}
            modules={textModule}
            placeholder="Please enter the formatted text for commentary here."
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
