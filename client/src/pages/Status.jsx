import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Status.scss";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/index.js";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

export default function Status() {
  const [statusData, setStatusData] = useState([]);
  const [tasks, setTasks] = useState([]);
  // console.log(statusData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
  const logout = () => {
    dispatch(setLogout());
    navigate("/admin");
  };
  // console.log(isMobile);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {!statusData.length ? (
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
                  borderRadius: "20px",
                  borderColor: "black",
                  borderWidth: "1px",
                  boxShadow: "none",
                  // backgroundImage: `url(${BG})`,
                  backgroundColor: "#E8A87C",
                  color: "white",
                  // backgroundSize: "cover",
                  // backgroundRepeat: "no-repeat",
                }}
              >
                For Admin
              </button>
            </Link>
            {/* <button
              style={{
                height: "60%",
                width: "30%",
              }}
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </button> */}
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
                width: "80%",
                height: "100%",
                backgroundColor: "transparent",
                // borderRadius: "5px",
                // border: "solid",
                // borderWidth: "1px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {statusData.map((stat, index) => (
                // return (
                <div
                  key={stat.teamNumber}
                  style={{
                    height: "10%",
                    width: "100%",
                    margin: "5px",
                    borderWidth: "1px",
                    border: "solid",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    // borderTop: "0.5px solid",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "25%",
                      display: "flex",
                      fontSize: "2vw",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      // border: "solid",
                      // borderTopLeftRadius: "50px",
                      // borderBottomLeftRadius: "50px",
                      overflow: "hidden",
                      color: "white",
                    }}
                  >
                    {index === 0 && (
                      <div
                        style={{
                          height: "100%",
                          width: "25%",
                          display: "flex",
                          fontSize: "2vw",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          overflow: "hidden",
                          color: "white",
                          // border: "solid",
                          borderTopLeftRadius: "25px",
                          borderBottomLeftRadius: "25px",
                          backgroundColor: "#c9b037",
                        }}
                      >
                        {index + 1}
                      </div>
                    )}
                    {index === 1 && (
                      <div
                        style={{
                          height: "100%",
                          width: "25%",
                          display: "flex",
                          fontSize: "2vw",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: "25px",
                          borderBottomLeftRadius: "25px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          color: "white",
                          backgroundColor: "#d7d7d7",
                        }}
                      >
                        {index + 1}
                      </div>
                    )}
                    {index === 2 && (
                      <div
                        style={{
                          height: "100%",
                          width: "25%",
                          display: "flex",
                          fontSize: "2vw",
                          borderTopLeftRadius: "25px",
                          borderBottomLeftRadius: "25px",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          overflow: "hidden",
                          color: "white",
                          backgroundColor: "#ad8a56",
                        }}
                      >
                        {index + 1}
                      </div>
                    )}
                    {index > 2 && (
                      <div
                        style={{
                          height: "100%",
                          width: "25%",
                          display: "flex",
                          fontSize: "2vw",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          overflow: "hidden",
                          color: "white",
                        }}
                      >
                        {index + 1}
                      </div>
                    )}

                    <div
                      style={{
                        height: "100%",
                        width: "75%",
                        display: "flex",
                        fontSize: isMobile ? "3vw" : "1.5vw",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        overflow: "hidden",
                        color: "white",
                      }}
                    >
                      {stat.teamName}
                    </div>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      width: "75%",
                      display: "flex",
                      overflow: "hidden",
                    }}
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
                                backgroundColor: "#E27D5F",
                                overflow: "hidden",
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
