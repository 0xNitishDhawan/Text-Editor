import React, { useState } from "react";
import ButtonSection from "./SubComponent/ButtonSection";
import Editor from "./SubComponent/Editor";
import axios from "axios";

const Operation = () => {
  const [date, setDate] = useState("");
  const [opsSummaryCommentary, setOpsSummaryCommentary] = useState("");
  const [opsPerformanceCommentary, setOpsPerformanceCommentary] = useState("");
  const [airportCommentary, setAirportCommentary] = useState("");
  const [engineeringAndBaggageCommentary, setEngineeringAndBaggageCommentary] = useState("");
  const [opsPlanningCommentary, setOpsPlanningCommentary] = useState("");
  const [directorateCommentary, setDirectorateCommentary] = useState("");
  const [securityCommentary, setSecurityCommentary] = useState("");
  const [servicesCommentary, setServicesCommentary] = useState("");
  const [teamHeathrowCommentary, setTeamHeathrowCommentary] = useState("");
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/operation/update-file",
        {
          date,
          opsSummaryCommentary,
          opsPerformanceCommentary,
          airportCommentary,
          engineeringAndBaggageCommentary,
          opsPlanningCommentary,
          directorateCommentary,
          securityCommentary,
          servicesCommentary,
          teamHeathrowCommentary,
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
        "http://localhost:5000/operation/fetch-data",
        {
          date,
        }
      );

      const {
        opsSummaryCommentary,
        opsPerformanceCommentary,
        airportCommentary,
        engineeringAndBaggageCommentary,
        opsPlanningCommentary,
        directorateCommentary,
        securityCommentary,
        servicesCommentary,
        teamHeathrowCommentary,
      } = response.data;
      setOpsSummaryCommentary(opsSummaryCommentary);
      setOpsPerformanceCommentary(opsPerformanceCommentary);
      setAirportCommentary(airportCommentary);
      setEngineeringAndBaggageCommentary(engineeringAndBaggageCommentary);
      setOpsPlanningCommentary(opsPlanningCommentary);
      setDirectorateCommentary(directorateCommentary);
      setSecurityCommentary(securityCommentary);
      setServicesCommentary(servicesCommentary);
      setTeamHeathrowCommentary(teamHeathrowCommentary);
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
        editorHeading={"Total Ops Summary"}
        date={date}
        setDate={setDate}
        value={opsSummaryCommentary}
        setValue={setOpsSummaryCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Total Ops Performance"}
        date={date}
        setDate={setDate}
        value={opsPerformanceCommentary}
        setValue={setOpsPerformanceCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Airport Operations"}
        date={date}
        setDate={setDate}
        value={airportCommentary}
        setValue={setAirportCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Engineering and Baggage"}
        date={date}
        setDate={setDate}
        value={engineeringAndBaggageCommentary}
        setValue={setEngineeringAndBaggageCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Ops Planning"}
        date={date}
        setDate={setDate}
        value={opsPlanningCommentary}
        setValue={setOpsPlanningCommentary}
      />
      <hr />
      <Editor
        editorHeading={"COO Directorate"}
        date={date}
        setDate={setDate}
        value={directorateCommentary}
        setValue={setDirectorateCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Security"}
        date={date}
        setDate={setDate}
        value={securityCommentary}
        setValue={setSecurityCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Services"}
        date={date}
        setDate={setDate}
        value={servicesCommentary}
        setValue={setServicesCommentary}
      />
      <hr />
      <Editor
        editorHeading={"Team Heathrow"}
        date={date}
        setDate={setDate}
        value={teamHeathrowCommentary}
        setValue={setTeamHeathrowCommentary}
      />
    </>
  );
};

export default Operation;
