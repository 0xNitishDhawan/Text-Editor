// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import Homebutton from "./Homebutton";
// import Editor from "./Editor";
// import Button from "./Button";
// const Solution = ({ filePath }) => {
//   const [summaryDate, setSummaryDate] = useState("date1");
//   const [summaryCommentary, setSummaryCommentary] = useState("text11");
//   const [solutionDate, setSolutionDate] = useState("date2");
//   const [solutionCommentary, setSolutionCommentary] = useState("text2");
//   const [supportDate, setsupportDate] = useState("date3");
//   const [supportCommentary, setsupportCommentary] = useState("text3");

//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleClick = async () => {
//     try {
//       if (!file) {
//         console.error("No file selected");
//         return;
//       }
//       const data = await file.arrayBuffer(); // Read file as array buffer
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets["Sheet1"];
//       console.log("sheet before modification", sheet["B1"]);
//       sheet["!ref"]="A1:D10"
//       sheet["A1"] = { v: "Fiscal Period" };
//       sheet["B1"] = { v: "Business Unit" };
//       sheet["C1"] = { v: "Performance", t: "s" };
//       sheet["D1"] = { v: "Summary", t: "s" };
//       sheet["A2"] = { v: summaryDate };
//       sheet["A3"] = { v: solutionDate };
//       sheet["A4"] = { v: supportDate };
//       sheet["B2"] = { v: "Summary", t: "s" };
//       sheet["B3"] = { v: "Solution", t: "s" };
//       sheet["B4"] = { v: "Support Services", t: "s" };
//       sheet["D2"] = { v: summaryCommentary, t: "s" };
//       sheet["C3"] = { v: solutionCommentary, t: "s" };
//       sheet["C4"] = { v: supportCommentary, t: "s" };
//       console.log("sheet after modification", sheet);

//       const newWorkbook = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       const blob = new Blob([newWorkbook], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(blob, "generated_file.xlsx");

//       console.log("Excel file generated and downloaded successfully!");
//       console.log("A1:", sheet["A1"]?.v);
//       console.log("B1:", sheet["B1"]?.v);
//       console.log("C1:", sheet["C1"]?.v);
//       console.log("D1:", sheet["D1"]?.v);
//     } catch (error) {
//       console.log(error, "something went wrong");
//     }
//   };
//   return (
//     <>
//       <Homebutton />
//       <Button handleClick={handleClick} />
//       <input type="file" onChange={handleFileChange} />
//       <Editor
//         editorHeading={"Summary"}
//         date={summaryDate}
//         setDate={setSummaryDate}
//         value={summaryCommentary}
//         setValue={setSummaryCommentary}
//       />
//       <div>{summaryCommentary}</div>
//       <hr />
//       <Editor
//         editorHeading={"Solutions"}
//         date={solutionDate}
//         setDate={setSolutionDate}
//         value={solutionCommentary}
//         setValue={setSolutionCommentary}
//       />
//       <div>{solutionCommentary}</div>
//       <hr />
//       <Editor
//         editorHeading={"Support Services"}
//         date={supportDate}
//         setDate={setsupportDate}
//         value={supportCommentary}
//         setValue={setsupportCommentary}
//       />
//       <div>{supportCommentary}</div>
//     </>
//   );
// };

// export default Solution;

import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import axios from "axios";
import Homebutton from "./Homebutton";
import Editor from "./Editor";
import Button from "./Button";
const Solution = ({ filePath }) => {
  const [date, setDate] = useState("");
  const [summaryCommentary, setSummaryCommentary] = useState("");
  const [solutionCommentary, setSolutionCommentary] = useState("");
  const [supportCommentary, setsupportCommentary] = useState("");

  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

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
      <Homebutton />
      <div className="buttonSection">
        <Button handleClick={handleFetch} text={"Fetch Data"} />
        <Button handleClick={handleClick} text={"Convert to HTML"} />
      </div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <Editor
        editorHeading={"Summary"}
        date={date}
        setDate={setDate}
        value={summaryCommentary}
        setValue={setSummaryCommentary}
      />
      {/* <div>{summaryCommentary}</div> */}
      <hr />
      <Editor
        editorHeading={"Solutions"}
        date={date}
        setDate={setDate}
        value={solutionCommentary}
        setValue={setSolutionCommentary}
      />
      {/* <div>{solutionCommentary}</div> */}
      <hr />
      <Editor
        editorHeading={"Support Services"}
        date={date}
        setDate={setDate}
        value={supportCommentary}
        setValue={setsupportCommentary}
      />
      {/* <div>{supportCommentary}</div> */}
    </>
  );
};

export default Solution;
