import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.scss";
import { setLogin, setLogout } from "../state/index.js";
export default function Admin() {
  const isAuth = useSelector((state) => state.admin);
  const adminToken = useSelector((state) => state.token);
  const adminId = useSelector((state) => state.id);
  const adminTask = useSelector((state) => state.task);
  const [statusData, setStatusData] = useState();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [teams, setTeams] = useState();
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("admin"));
    // console.log(items);
    if (isAuth) {
      setUser(isAuth);
      getAdmin();
      getTeams();
    }
  }, []);
  // console.log(user);
  // console.log(teams);
  // console.log(statusData);
  if (teams && user && !statusData) {
    const result = teams.map((team) => {
      if (user.passed.find((element) => element === team._id))
        return { ...team, passed: true };
      else return { ...team, passed: false };
    });
    // console.log(result);
    setStatusData(result);
  }

  const getTeams = async () => {
    const response = await fetch(
      "https://back-to-childhood.vercel.app/team/status",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setTeams(data);
  };
  const getAdmin = async () => {
    const response = await fetch(
      `https://back-to-childhood.vercel.app/admin/${adminId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };
  const changeStatusBack = async (teamID) => {
    // const object = { teamID: `${teamID}` };
    const response = await fetch(
      `https://back-to-childhood.vercel.app/admin/${adminId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamID: `${teamID}` }),
      }
    );
    const responseText = await response.text();
    // console.log(responseText);
  };
  const changeTeamStatusBack = async (teamID) => {
    // const object = { teamID: `${teamID}` };
    const response = await fetch(
      `https://back-to-childhood.vercel.app/team/${teamID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: adminTask }),
      }
    );
    const responseText = await response.text();
    // console.log(responseText);
  };
  function changeStatus(current) {
    changeStatusBack(current._id);
    changeTeamStatusBack(current._id);
    const newStatus = statusData.map((e) => {
      if (e._id === current._id) {
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
  // console.log(values);
  const login = async (values) => {
    const loggedInResponse = await fetch(
      "https://back-to-childhood.vercel.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    // onSubmitProps.resetForm();

    if (loggedIn) {
      // console.log(loggedIn);
      dispatch(
        setLogin({
          admin: loggedIn.admin,
          token: loggedIn.token,
          id: loggedIn.admin._id,
          task: loggedIn.admin.task,
        })
      );
      window.location.reload(false);
      // navigate("/admin");
    }
  };
  const logout = () => {
    dispatch(setLogout());
    navigate("/admin");
  };
  // console.log(isAuth);
  // console.log(teams);
  // console.log(user);
  // console.log(statusData);
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
          <div style={{ height: "50%", width: "90%" }}>
            <Link style={{ height: "100%", width: "30%" }} to={"/"}>
              <button
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                Status
              </button>
            </Link>
            {/* <button
                style={{
                  height: "50%",
                  width: "30%",
                }}
                onClick={() => {
                  logout();
                }}
              >
                LogOut
              </button> */}
          </div>
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
    if (!statusData) {
      <div style={{ height: "100%", width: "100%" }} className="loading">
        <div></div>
        <div></div>
      </div>;
    } else
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "12.5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => {
                  navigate("/");
                }}
                style={{ height: "60%", width: "30%" }}
              >
                Status
              </button>
              <button
                style={{
                  height: "60%",
                  width: "30%",
                }}
              >
                INFO
              </button>
              <button
                style={{
                  height: "60%",
                  width: "30%",
                }}
                onClick={() => {
                  logout();
                }}
              >
                LogOut
              </button>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              overflow: "scroll",
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
