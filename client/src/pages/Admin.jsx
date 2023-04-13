import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.scss";
import { setLogin, setLogout, setTasks } from "../state/index.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");
  // console.log(currentTeam);
  // console.log(check);
  const handleOpen = (team) => {
    setCurrentTeam(team);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isAuth = useSelector((state) => state.admin);
  const adminToken = useSelector((state) => state.token);
  const adminId = useSelector((state) => state.id);
  const adminTask = useSelector((state) => state.task);
  const [statusData, setStatusData] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [teams, setTeams] = useState();
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("admin"));
    // console.log(items);
    if (isAuth) {
      // setUser(isAuth);
      getAdmin();
      getTeams();
    }
  }, []);
  // console.log(user);
  // console.log(teams);
  // console.log(statusData);
  if (teams && user && !statusData.length) {
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
    // if (responseText) {
    //   isAuth.passed = responseTe
    //   dispatch(
    //     setTasks({
    //       admin: responseText.admin,
    //     })
    //   );
    // }
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
  const changeStatus = (current) => {
    changeStatusBack(current._id);
    changeTeamStatusBack(current._id);
    const newStatus = statusData.map((e) => {
      if (e._id === current._id) {
        e.passed = !e.passed;
      }
      return e;
    });
    setStatusData(newStatus);
    handleClose();
  };
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
            <h2>Welcome Master!</h2>
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
              Enter
            </button>
            <span className="footer"></span>
          </form>
        </div>
      </div>
    );
  } else {
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
                height: "12.5%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To confirm that team passed the task please type name of the
                    team below{" "}
                    <p style={{ color: "red" }}>{currentTeam.teamName}</p>
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Team name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setCheck(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {check === currentTeam.teamName && (
                    <Button onClick={() => changeStatus(currentTeam)}>
                      Confirm
                    </Button>
                  )}
                  {check !== currentTeam.teamName && <Button>Confirm</Button>}
                </DialogActions>
              </Dialog>
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
                  style={{
                    height: "60%",
                    fontWeight: "bold",
                    width: "30%",
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
                  Status
                </button>
                <button
                  style={{
                    height: "60%",
                    width: "30%",
                    borderRadius: "20px",
                    borderColor: "black",
                    borderWidth: "1px",
                    fontWeight: "bold",
                    boxShadow: "none",
                    // backgroundImage: `url(${BG})`,
                    backgroundColor: "#E8A87C",
                    color: "white",
                    // backgroundSize: "cover",
                    // backgroundRepeat: "no-repeat",
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
                          ? {
                              fontSize: "0.5rem",
                              width: "100%",
                              fontWeight: "bold",
                            }
                          : {
                              fontSize: "0.5rem",
                              width: "100%",
                              fontWeight: "bold",
                              color: "white",
                            }
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
                      onClick={() => handleOpen(team)}
                      // onClick={() => changeStatus(team)}
                    >
                      {team.passed ? "Cancel" : "Passed"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}
