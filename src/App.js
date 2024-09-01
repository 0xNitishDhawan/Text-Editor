import "./App.css";
import Homepage from "./Components/SubComponent/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Solution from "./Components/Solution";
import Operation from "./Components/Operation";
import Commercial from "./Components/Commercial";
import Exec from "./Components/Exec";

function App() {
  const filePath = 'C:/Users/Nitish Dhawan/OneDrive - BENNETT UNIVERSITY/Desktop/Destination.xlsx'; // Replace with the correct path to your file
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exec" element={<Exec />} />
        <Route path="/solution" element={<Solution filePath={filePath} />} />
        <Route path="/operations" element={<Operation />} />
        <Route path="/commercial" element={<Commercial />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
