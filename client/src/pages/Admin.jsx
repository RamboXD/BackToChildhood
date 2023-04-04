import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.scss";
import { setLogin } from "../state/index.js";
export default function Admin() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const [statusData, setStatusData] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [teams, setTeams] = useState();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("admin"));
    if (items) {
      setUser(items);
    }
    // setStatusData([
    //   { teamNumber: 1, teamName: "tigr", passed: false },
    //   { teamNumber: 2, teamName: "begemot", passed: false },
    //   { teamNumber: 3, teamName: "zveri", passed: false },
    //   { teamNumber: 4, teamName: "auf", passed: false },
    //   { teamNumber: 5, teamName: "hans", passed: false },
    //   { teamNumber: 6, teamName: "Kazakh", passed: false },
    //   { teamNumber: 7, teamName: "bestTeam", passed: false },
    //   { teamNumber: 8, teamName: "SpongeBob", passed: false },
    //   { teamNumber: 9, teamName: "GGWP", passed: false },
    //   { teamNumber: 10, teamName: "HEHE", passed: false },
    // ]);
    getTeams();
  }, []);
  console.log(user);
  const getTeams = async () => {
    const response = await fetch("http://localhost:3001/team/status", {
      method: "GET",
    });
    const data = await response.json();
    setStatusData(data);
  };
  console.log(teams);
  function changeStatus(current) {
    const newStatus = statusData.map((e) => {
      if (e.teamNumber === current.teamNumber) {
        e.passed = !e.passed;
      }
      return e;
    });
    setStatusData(newStatus);
  }
  const [values, setValues] = useState({
    login: "",
    password: "",
  });
  console.log(values);
  const login = async (values) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    // onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          admin: loggedIn.admin,
          token: loggedIn.token,
        })
      );
      navigate("/admin");
    }
  };

  if (!isAuth) {
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
                onChange={(e) =>
                  setValues({ ...values, login: e.target.value })
                }
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
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                name="password"
                required
              />
              <label htmlFor="password" className="label">
                Password from the dungeon
              </label>
            </section>
            <button
              type="button"
              onClick={() => {
                login(values);
              }}
              className="btn"
            >
              Please, WelCum
            </button>
            <span className="footer"></span>
          </form>
        </div>
      </div>
    );
  } else {
    if (!teams) {
      return null;
    } else
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
                key={team._id}
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
