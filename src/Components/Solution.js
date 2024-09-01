import React, { useState } from "react";
import axios from "axios";
import Editor from "./SubComponent/Editor";
import ButtonSection from "./SubComponent/ButtonSection";
const Solution = ({ filePath }) => {
  const [date, setDate] = useState("");
  const [summaryCommentary, setSummaryCommentary] = useState("");
  const [solutionCommentary, setSolutionCommentary] = useState("");
  const [supportCommentary, setsupportCommentary] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/solution/update-file",
        {
          date,
          summaryCommentary,
          solutionCommentary,
          supportCommentary,
        }
      );
      console.log(response.data);
      alert("The excel File has been Updated Successfully.");
    } catch (error) {
      console.log(error, "something went wrong");
      alert(
        "Something went wrong, maybe the file is already opened or path entered is Incorrect"
      );
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/solution/fetch-data",
        {
          date,
        }
      );

      const { summaryCommentary, solutionCommentary, supportCommentary } =
        response.data;

      // Update the state with the fetched data
      setSummaryCommentary(summaryCommentary);
      setSolutionCommentary(solutionCommentary);
      setsupportCommentary(supportCommentary);
      setTimeout(() => {
        alert("Data fetched successfully.");
      }, 500);
    } catch (error) {
      console.log(error, "something went wrong");
      alert(
        "Something went wrong!\nData might not be available for the selected date, or the file is already opened or path entered is Incorrect"
      );
    }
  };

  return (
    <>
      <ButtonSection handleClick={handleClick} handleFetch={handleFetch} />
      <Editor
        editorHeading={"Summary"}
        date={date}
        setDate={setDate}
        value={summaryCommentary}
        setValue={setSummaryCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Solutions"}
        date={date}
        setDate={setDate}
        value={solutionCommentary}
        setValue={setSolutionCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Support Services"}
        date={date}
        setDate={setDate}
        value={supportCommentary}
        setValue={setsupportCommentary}
      />
    </>
  );
};

export default Solution;
