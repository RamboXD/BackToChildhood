import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Status.scss";

export default function Status() {
  const [statusData, setStatusData] = useState([]);
  const [tasks, setTasks] = useState([]);
  console.log(statusData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // setStatusData([
    //   { teamNumber: 1, teamName: "tigr", passed: [1] },
    //   { teamNumber: 2, teamName: "begemot", passed: [2] },
    //   { teamNumber: 3, teamName: "zveri", passed: [3] },
    //   { teamNumber: 4, teamName: "auf", passed: [4] },
    //   { teamNumber: 5, teamName: "hans", passed: [5] },
    //   { teamNumber: 6, teamName: "Kazakh", passed: [6] },
    //   { teamNumber: 7, teamName: "bestTeam", passed: [7] },
    //   { teamNumber: 8, teamName: "SpongeBob", passed: [8] },
    //   { teamNumber: 9, teamName: "GGWP", passed: [9] },
    //   { teamNumber: 10, teamName: "HEHE", passed: [10] },
    // ]);
    setTasks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    getTeams();
  }, []);
  const getTeams = async () => {
    const response = await fetch(
      "https://back-to-childhood.vercel.app/team/status",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setStatusData(data);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {loading ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link style={{ height: "50%", width: "90%" }} to={"/admin"}>
              <button
                style={{
                  height: "100%",
                  width: "100%",
                  fontSize: "4vw",
                  // backgroundImage: `url(${BG})`,
                  backgroundColor: "#ffffff",
                  // backgroundSize: "cover",
                  // backgroundRepeat: "no-repeat",
                }}
              >
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
                backgroundColor: "transparent",
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
                    borderTop: "0.5px solid",
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
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    {stat.teamName}
                  </div>
                  <div
                    style={{ height: "100%", width: "80%", display: "flex" }}
                  >
                    {tasks.map((task) => (
                      <div
                        style={
                          stat.tasksDone.find((element) => {
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
                                // backgroundColor: "#ccff99",
                                backgroundColor: "#6dff6a",
                              }
                            : {
                                height: "100%",
                                width: "10%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "3vw",
                                borderLeft: "0.5px solid",
                                backgroundColor: "#f92f2f",
                                // backgroundColor: "transparent",
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
        </>
      )}
    </div>
  );
}
