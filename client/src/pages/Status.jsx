import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Status() {
  const [statusData, setStatusData] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setStatusData([
      { teamNumber: 1, teamName: "tigr", passed: [1] },
      { teamNumber: 2, teamName: "begemot", passed: [2] },
      { teamNumber: 3, teamName: "zveri", passed: [3] },
      { teamNumber: 4, teamName: "auf", passed: [4] },
      { teamNumber: 5, teamName: "hans", passed: [5] },
      { teamNumber: 6, teamName: "Kazakh", passed: [6] },
      { teamNumber: 7, teamName: "bestTeam", passed: [7] },
      { teamNumber: 8, teamName: "SpongeBob", passed: [8] },
      { teamNumber: 9, teamName: "GGWP", passed: [9] },
      { teamNumber: 10, teamName: "HEHE", passed: [10] },
    ]);
    setTasks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link style={{ height: "50%", width: "90%" }} to={"/admin"}>
          <button style={{ height: "100%", width: "100%", fontSize: "4vw" }}>
            I am Admin
          </button>
        </Link>
      </div>
      <div
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            backgroundColor: "#b3ffcc",
            borderRadius: "5px",
            border: "solid",
            borderWidth: "1px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {statusData.map((stat) => (
            // return (
            <div
              key={stat.teamNumber}
              style={{
                height: "10%",
                width: "100%",
                borderBottom: "0.5px solid",
                display: "flex",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "20%",
                  display: "flex",
                  fontSize: "2.5vw",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {stat.teamName}
              </div>
              <div style={{ height: "100%", width: "80%", display: "flex" }}>
                {tasks.map((task) => (
                  <div
                    style={
                      stat.passed.find((element) => {
                        return element === task;
                      }) === task
                        ? {
                            height: "100%",
                            width: "10%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeft: "0.5px solid",
                            fontSize: "3vw",
                            backgroundColor: "green",
                          }
                        : {
                            height: "100%",
                            width: "10%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3vw",
                            borderLeft: "0.5px solid",
                            backgroundColor: "red",
                          }
                    }
                  >
                    {task}
                  </div>
                ))}
              </div>
            </div>
            // );
          ))}
        </div>
      </div>
    </div>
  );
}
