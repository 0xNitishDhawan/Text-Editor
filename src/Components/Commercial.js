import React, { useState } from "react";
import ButtonSection from "./SubComponent/ButtonSection";
import Editor from "./SubComponent/Editor";
import axios from "axios";

const Commercial = () => {
  const [date, setDate] = useState("");
  const [performanceCommentary, setPerformanceCommentary] = useState("")
  const [opexCommentary, setOpexCommentary] = useState("")
  const [revenueBreakdownCommentary, setRevenueBreakdownCommentary] = useState("")
  const [revenueROCommentary, setRevenueROCommentary] = useState("")
  const [opexROCommentary, setOpexROCommentary] = useState("")
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/commercial/update-file",
        {
          date,
          performanceCommentary,
          opexCommentary,
          revenueBreakdownCommentary,
          revenueROCommentary,
          opexROCommentary
        }
      );
      console.log(response.data);
      alert("The excel File has been Updated Successfully.");
    } catch (error) {
      console.log(error, "something went wrong");
      alert(
        "Something went wrong, maybe the file is already opened or path entered is Incorrect."
      );
    }
  };
  const handleFetch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/commercial/fetch-data",
        {
          date,
        }
      );

      const { performanceCommentary, opexCommentary, revenueBreakdownCommentary, revenueROCommentary, opexROCommentary } =
        response.data;

      // Update the state with the fetched data
      setPerformanceCommentary(performanceCommentary);
      setOpexCommentary(opexCommentary);
      setRevenueBreakdownCommentary(revenueBreakdownCommentary)
      setRevenueROCommentary(revenueROCommentary)
      setOpexROCommentary(opexROCommentary)
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
      <ButtonSection handleClick={handleClick} handleFetch={handleFetch}/>
      <Editor
        editorHeading={"Revenue Performance Summary"}
        date={date}
        setDate={setDate}
        value={performanceCommentary}
        setValue={setPerformanceCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Commercial Opex Summary"}
        date={date}
        setDate={setDate}
        value={opexCommentary}
        setValue={setOpexCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Revenue Breakdown"}
        date={date}
        setDate={setDate}
        value={revenueBreakdownCommentary}
        setValue={setRevenueBreakdownCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Revenue R&Os vs. MBP 2024-26"}
        date={date}
        setDate={setDate}
        value={revenueROCommentary}
        setValue={setRevenueROCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Opex R&Os vs. MBP 2024-26"}
        date={date}
        setDate={setDate}
        value={opexROCommentary}
        setValue={setOpexROCommentary}
      />
      <hr />
    </>
  );
};

export default Commercial;
