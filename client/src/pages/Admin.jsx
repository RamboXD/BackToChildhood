import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Admin.scss";
export default function Admin() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    setStatusData([
      { teamNumber: 1, teamName: "tigr", passed: false },
      { teamNumber: 2, teamName: "begemot", passed: false },
      { teamNumber: 3, teamName: "zveri", passed: false },
      { teamNumber: 4, teamName: "auf", passed: false },
      { teamNumber: 5, teamName: "hans", passed: false },
      { teamNumber: 6, teamName: "Kazakh", passed: false },
      { teamNumber: 7, teamName: "bestTeam", passed: false },
      { teamNumber: 8, teamName: "SpongeBob", passed: false },
      { teamNumber: 9, teamName: "GGWP", passed: false },
      { teamNumber: 10, teamName: "HEHE", passed: false },
    ]);
  }, []);

  function changeStatus(current) {
    const newStatus = statusData.map((e) => {
      if (e.teamNumber === current.teamNumber) {
        e.passed = !e.passed;
      }
      return e;
    });
    setStatusData(newStatus);
  }

  if (isAuth) {
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
          <Link style={{ height: "50%", width: "90%" }} to={"/"}>
            <button
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              Status
            </button>
          </Link>
        </div>
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form className="wrapper">
            <h2>WelCum Master!</h2>
            <section className="group">
              <input
                type="text"
                size="30"
                className="input"
                name="email"
                required
              />
              <label htmlFor="email" className="label">
                Your name please?
              </label>
            </section>
            <section className="group">
              <input
                type="password"
                size="30  "
                minLength="8"
                className="input"
                name="password"
                required
              />
              <label htmlFor="password" className="label">
                Password from the dungeon
              </label>
            </section>
            <button type="button" className="btn">
              Please, WelCum
            </button>
            <span className="footer"></span>
          </form>
        </div>
      </div>
    );
  } else {
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
          <Link style={{ height: "50%", width: "80%" }} to={"/"}>
            <button style={{ height: "100%", width: "100%" }}>Status</button>
          </Link>
        </div>
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {statusData.map((team) => (
            <div
              style={
                !team.passed
                  ? {
                      width: "75%",
                      height: "100%",
                      marginBottom: "30px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      overflow: "hidden",
                      backgroundColor: "  #ff3333",
                      borderRadius: "15px",
                    }
                  : {
                      width: "75%",
                      height: "100%",
                      marginBottom: "30px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      overflow: "hidden",
                      backgroundColor: " #ccff99",
                      borderRadius: "15px",
                    }
              }
            >
              <div style={{ paddingLeft: "20px", width: "20%" }}>
                <div
                  style={
                    team.passed
                      ? { fontSize: "1rem" }
                      : { fontSize: "1rem", color: "white" }
                  }
                >
                  {team.teamName}
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  style={{}}
                  onClick={() => changeStatus(team)}
                >
                  {team.passed ? "Cancel" : "Passed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
