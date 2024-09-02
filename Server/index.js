// const express = require("express");
// const XLSX = require("xlsx");
// const cors = require("cors");
// const app = express();
// const port = 5000;
// app.use(cors());

// app.use(express.json());

// const filePath = 'C:/Users/Nitish Dhawan/OneDrive - BENNETT UNIVERSITY/Desktop/Destination.xlsx';
// // const filePath = 'C:/Users/Nitish Dhawan/OneDrive - BENNETT UNIVERSITY/Desktop/TestDestination.csv';

// app.post("/solution/update-file", (req, res) => {
//   const { date, summaryCommentary, solutionCommentary, supportCommentary } = req.body;
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = "Sheet1";
//   const sheet = workbook.Sheets[sheetName];

//   if (sheet) {
//     // Find the row with the matching date or get the next empty row
//     sheet["!ref"] = "A1:D13";
//     let rowToUpdate = null;
//     let nextEmptyRow = 2; // Assuming row 1 is the header

//     // Iterate over the rows in column A to find the matching date
//     for (let row = 2; sheet[`A${row}`]; row++) {
//       if (sheet[`A${row}`].v === date) {
//         rowToUpdate = row;
//         break;
//       }
//       nextEmptyRow = row + 1;
//     }

//     // If date is found, update the row; otherwise, use the next empty row
//     const targetRow = rowToUpdate || nextEmptyRow;
//     sheet["A1"] = { v: "Fiscal Period", t: "s" };
//     sheet["B1"] = { v: "Summary", t: "s" };
//     sheet["C1"] = { v: "Solution", t: "s" };
//     sheet["D1"] = { v: "Support Services", t: "s" };

//     sheet[`A${targetRow}`] = { v: date };
//     sheet[`B${targetRow}`] = { v: summaryCommentary, t: "s" };
//     sheet[`C${targetRow}`] = { v: solutionCommentary, t: "s" };
//     sheet[`D${targetRow}`] = { v: supportCommentary, t: "s" };

//     // Save the updated workbook
//     XLSX.writeFile(workbook, filePath);
//     res.send("Excel file updated successfully!");
//   } else {
//     res.status(400).send("Sheet not found!");
//     console.log("Something Went Wrong")
//   }
// });

// app.post("/solution/fetch-data", (req, res) => {
//   const { date } = req.body;
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = "Sheet1";
//   const sheet = workbook.Sheets[sheetName];

//   if (sheet) {
//     let foundData = null;

//     // Iterate over the rows in column A to find the matching date
//     for (let row = 2; sheet[`A${row}`]; row++) {
//       if (sheet[`A${row}`].v === date) {
//         foundData = {
//           summaryCommentary: sheet[`B${row}`]?.v || "",
//           solutionCommentary: sheet[`C${row}`]?.v || "",
//           supportCommentary: sheet[`D${row}`]?.v || ""
//         };
//         break;
//       }
//     }

//     if (foundData) {
//       res.json(foundData);
//     } else {
//       res.status(404).send("Data not found for the given date.");
//     }
//   } else {
//     res.status(400).send("Sheet not found!");
//   }
// });


// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require("express");
const XLSX = require("xlsx");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

const filePath = 'C:/Users/Nitish Dhawan/OneDrive - BENNETT UNIVERSITY/Desktop/TestDestination.csv';

app.post("/solution/update-file", (req, res) => {
  const { date, summaryCommentary, solutionCommentary, supportCommentary } = req.body;
  const workbook = XLSX.readFile(filePath, { type: "binary", cellDates: true });
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
    XLSX.writeFile({ SheetNames: [workbook.SheetNames[0]], Sheets: { [workbook.SheetNames[0]]: updatedSheet } }, filePath);
    res.send("CSV file updated successfully!");
  } else {
    res.status(400).send("Sheet not found!");
  }
});

app.post("/solution/fetch-data", (req, res) => {
  const { date } = req.body;
  const workbook = XLSX.readFile(filePath, { type: "binary", cellDates: true });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
