import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card"

const Homepage = () => {
  return (
    <div className="card-container">
      <Link to={"/solution"}>
        <Card title={"Solutions"} />
      </Link>
      <Link to={"/commercial"}>
        <Card title={"Commercial"} />
      </Link>
      <Link to={"/operations"}>
        <Card title={"Operations"} />
      </Link>
      <Link to={"/exec"}>
        <Card title={"Exec"} />
      </Link>
      <Link to={"/editor"}>
        <Card title={"Editor"} />
      </Link>
    </div>
  );
};

export default Homepage;
