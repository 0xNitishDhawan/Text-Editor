const express = require("express");
const XLSX = require("xlsx");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

app.post("/solution/update-file", (req, res) => {
  const { summaryDate, summaryCommentary, solutionDate, solutionCommentary, supportDate, supportCommentary } = req.body;
  const filePath = 'C:/Users/Nitish Dhawan/OneDrive - BENNETT UNIVERSITY/Desktop/Destination.xlsx';

  const workbook = XLSX.readFile(filePath);
  const sheetName = "Sheet1";
  const sheet = workbook.Sheets[sheetName];

  if (sheet) {
    sheet["!ref"] = "A1:D10";
    sheet["A1"] = { v: "Fiscal Period" };
    sheet["B1"] = { v: "Business Unit" };
    sheet["C1"] = { v: "Performance", t: "s" };
    sheet["D1"] = { v: "Summary", t: "s" };
    sheet["A2"] = { v: summaryDate };
    sheet["A3"] = { v: solutionDate };
    sheet["A4"] = { v: supportDate };
    sheet["B2"] = { v: "Summary", t: "s" };
    sheet["B3"] = { v: "Solution", t: "s" };
    sheet["B4"] = { v: "Support Services", t: "s" };
    sheet["D2"] = { v: summaryCommentary, t: "s" };
    sheet["C3"] = { v: solutionCommentary, t: "s" };
    sheet["C4"] = { v: supportCommentary, t: "s" };

    XLSX.writeFile(workbook, filePath);
    res.send("Excel file updated successfully!");
  } else {
    res.status(400).send("Sheet not found!");
    console.log("Something Went Wrong")
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
