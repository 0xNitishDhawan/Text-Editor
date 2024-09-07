const {Solution_Output_File_Path, Commercial_Output_File_Path, Exec_Output_File_Path}=require("../path")
const express = require("express");
const XLSX = require("xlsx");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

const SolutionFile = Solution_Output_File_Path;
const CommercialFile= Commercial_Output_File_Path;
const ExecFile=Exec_Output_File_Path
app.post("/solution/update-file", (req, res) => {
  const { date, summaryCommentary, solutionCommentary, supportCommentary } = req.body;
  const workbook = XLSX.readFile(SolutionFile, { type: "binary", cellDates: true });
  let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

  if (sheet) {
    let rowToUpdate = null;
    let nextEmptyRow = 1; // Assuming row 0 is the header

    // Iterate over the rows in column A to find the matching date
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        rowToUpdate = row;
        break;
      }
      nextEmptyRow = row + 1;
    }

    // If date is found, update the row; otherwise, use the next empty row
    const targetRow = rowToUpdate || nextEmptyRow;
    
    if (targetRow >= sheet.length) {
      // Add new row if necessary
      sheet[targetRow] = [];
    }
    
    sheet[0] = ["Fiscal Period", "Summary", "Solution", "Support Services"];
    sheet[targetRow][0] = date;
    sheet[targetRow][1] = summaryCommentary;
    sheet[targetRow][2] = solutionCommentary;
    sheet[targetRow][3] = supportCommentary;

    // Convert the sheet data back to CSV and write the file
    const updatedSheet = XLSX.utils.aoa_to_sheet(sheet);
    XLSX.writeFile({ SheetNames: [workbook.SheetNames[0]], Sheets: { [workbook.SheetNames[0]]: updatedSheet } }, SolutionFile);
    res.send("CSV file updated successfully!");
  }
  else {
    res.status(400).send("Sheet not found!");
  }
});

app.post("/commercial/update-file",(req,res)=>{
  const {date, performanceCommentary, opexCommentary, revenueBreakdownCommentary, revenueROCommentary, opexROCommentary}=req.body;
  const workbook = XLSX.readFile(CommercialFile, { type: "binary", cellDates:true});
  let sheet= XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1});

  if(sheet){
    let rowToUpdate = null;
    let nextEmptyRow = 1; // Assuming row 0 is the header
    // Iterate over the rows in column A to find the matching date
    console.log(sheet.length)
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        rowToUpdate = row;
        break;
      }
      nextEmptyRow = row + 1;
    }
    
    // If date is found, update the row; otherwise, use the next empty row
    const targetRow = rowToUpdate || nextEmptyRow;

    if (targetRow >= sheet.length) {
      // Add new row if necessary
      sheet[targetRow] = [];
    }

    sheet[0] = ["Fiscal Period", "Revenue Performance Summary", "Commercial Opex Summary", "Revenue Breakdown", "Revenue R&Os vs. MBP 2024-26", "Opex R&Os vs. MBP 2024-26"];
    sheet[targetRow][0] = date;
    sheet[targetRow][1] = performanceCommentary;
    sheet[targetRow][2] = opexCommentary;
    sheet[targetRow][3] = revenueBreakdownCommentary;
    sheet[targetRow][4] = revenueROCommentary;
    sheet[targetRow][5] = opexROCommentary;

    // Convert the sheet data back to CSV and write the file
    const updatedSheet = XLSX.utils.aoa_to_sheet(sheet);
    XLSX.writeFile({ SheetNames: [workbook.SheetNames[0]], Sheets: { [workbook.SheetNames[0]]: updatedSheet } }, CommercialFile);
    res.send("CSV file updated successfully!");
  }
  else {
    res.status(400).send("Sheet not found!");
  }

})

app.post("/exec/update-file",(req,res)=>{
  const {date, execSummaryCommentary, passengersCommentary, capacityCommentary, peopleCommentary, revenueCommentary, opexCommentary}=req.body;
  const workbook = XLSX.readFile(ExecFile, { type: "binary", cellDates:true});
  let sheet= XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1});

  if(sheet){
    let rowToUpdate = null;
    let nextEmptyRow = 1; // Assuming row 0 is the header
    // Iterate over the rows in column A to find the matching date
    console.log(sheet.length)
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        rowToUpdate = row;
        break;
      }
      nextEmptyRow = row + 1;
    }
    
    // If date is found, update the row; otherwise, use the next empty row
    const targetRow = rowToUpdate || nextEmptyRow;

    if (targetRow >= sheet.length) {
      // Add new row if necessary
      sheet[targetRow] = [];
    }

    sheet[0] = ["Fiscal Period", "Exec Summary", "Passengers", "Capacity", "People", "Revenue", "Opex"];
    sheet[targetRow][0] = date;
    sheet[targetRow][1] = execSummaryCommentary;
    sheet[targetRow][2] = passengersCommentary;
    sheet[targetRow][3] = capacityCommentary;
    sheet[targetRow][4] = peopleCommentary;
    sheet[targetRow][5] = revenueCommentary;
    sheet[targetRow][6] = opexCommentary;

    // Convert the sheet data back to CSV and write the file
    const updatedSheet = XLSX.utils.aoa_to_sheet(sheet);
    XLSX.writeFile({ SheetNames: [workbook.SheetNames[0]], Sheets: { [workbook.SheetNames[0]]: updatedSheet } }, ExecFile);
    res.send("CSV file updated successfully!");
  }
  else {
    res.status(400).send("Sheet not found!");
  }

})

app.post("/solution/fetch-data", (req, res) => {
  const { date } = req.body;
  const workbook = XLSX.readFile(SolutionFile, { type: "binary", cellDates: true });
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

  if (sheet) {
    let foundData = null;

    // Iterate over the rows in column A to find the matching date
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        foundData = {
          summaryCommentary: sheet[row][1] || "",
          solutionCommentary: sheet[row][2] || "",
          supportCommentary: sheet[row][3] || ""
        };
        break;
      }
    }

    if (foundData) {
      res.json(foundData);
    } else {
      res.status(404).send("Data not found for the given date.");
    }
  } else {
    res.status(400).send("Sheet not found!");
  }
});

app.post("/commercial/fetch-data", (req, res) => {
  const { date } = req.body;
  const workbook = XLSX.readFile(CommercialFile, { type: "binary", cellDates: true });
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

  if (sheet) {
    let foundData = null;

    // Iterate over the rows in column A to find the matching date
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        foundData = {
          performanceCommentary: sheet[row][1] || "",
          opexCommentary: sheet[row][2] || "",
          revenueBreakdownCommentary: sheet[row][3] || "",
          revenueROCommentary: sheet[row][4] || "",
          opexROCommentary: sheet[row][5] || ""
        };
        break;
      }
    }

    if (foundData) {
      res.json(foundData);
    } else {
      res.status(404).send("Data not found for the given date.");
    }
  } else {
    res.status(400).send("Sheet not found!");
  }
});

app.post("/exec/fetch-data", (req, res) => {
  const { date } = req.body;
  const workbook = XLSX.readFile(ExecFile, { type: "binary", cellDates: true });
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

  if (sheet) {
    let foundData = null;

    // Iterate over the rows in column A to find the matching date
    for (let row = 1; row < sheet.length; row++) {
      if (sheet[row][0] === date) {
        foundData = {
          execSummaryCommentary: sheet[row][1] || "",
          passengersCommentary: sheet[row][2] || "",
          capacityCommentary: sheet[row][3] || "",
          peopleCommentary: sheet[row][4] || "",
          revenueCommentary: sheet[row][5] || "",
          opexCommentary: sheet[row][6] || ""
        };
        break;
      }
    }

    if (foundData) {
      res.json(foundData);
    } else {
      res.status(404).send("Data not found for the given date.");
    }
  } else {
    res.status(400).send("Sheet not found!");
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
