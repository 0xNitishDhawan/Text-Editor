import React, { useState } from "react";
import Editor from "./SubComponent/Editor";
import ButtonSection from "./SubComponent/ButtonSection";
import axios from "axios";

const Exec = () => {
  const [date, setDate] = useState("");
  const [execSummaryCommentary, setExecSummaryCommentary] = useState("");
  const [passengersCommentary, setPassengersCommentary] = useState("");
  const [capacityCommentary, setCapacityCommentary] = useState("");
  const [peopleCommentary, setPeopleCommentary] = useState("");
  const [revenueCommentary, setRevenueCommentary] = useState("");
  const [opexCommentary, setOpexCommentary] = useState("");
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/exec/update-file",
        {
          date,
          execSummaryCommentary,
          passengersCommentary,
          capacityCommentary,
          peopleCommentary,
          revenueCommentary,
          opexCommentary
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
        "http://localhost:5000/exec/fetch-data",
        {
          date,
        }
      );

      const {execSummaryCommentary, passengersCommentary, capacityCommentary, peopleCommentary, revenueCommentary, opexCommentary} =
        response.data;
        setExecSummaryCommentary(execSummaryCommentary);
        setPassengersCommentary(passengersCommentary);
        setCapacityCommentary(capacityCommentary);
        setPeopleCommentary(peopleCommentary);
        setRevenueCommentary(revenueCommentary);
        setOpexCommentary(opexCommentary);
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
        editorHeading={"Exec Summary"}
        date={date}
        setDate={setDate}
        value={execSummaryCommentary}
        setValue={setExecSummaryCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Passengers"}
        date={date}
        setDate={setDate}
        value={passengersCommentary}
        setValue={setPassengersCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Capacity"}
        date={date}
        setDate={setDate}
        value={capacityCommentary}
        setValue={setCapacityCommentary}
      />
      <hr />
      <Editor
        editorHeading={"People"}
        date={date}
        setDate={setDate}
        value={peopleCommentary}
        setValue={setPeopleCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Revenue"}
        date={date}
        setDate={setDate}
        value={revenueCommentary}
        setValue={setRevenueCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Opex"}
        date={date}
        setDate={setDate}
        value={opexCommentary}
        setValue={setOpexCommentary}
      />
    </>
  );
};

export default Exec;
