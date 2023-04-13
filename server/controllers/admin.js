import Team from "../models/Team.js";
import Admin from "../models/Admin.js";

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamID } = req.body;
    const admin = await Admin.findById(id);
    const team = await Team.findById(teamID);

    const index = admin.passed.findIndex((t) => String(t) === String(teamID));
    // console.log(index);
    if (index === -1) {
      admin.passed.push(String(teamID));
    } else {
      admin.passed = admin.passed.filter((t) => String(t) !== String(teamID));
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
      new: true,
    });
    const index2 = team.tasksDone.findIndex((t) => t === updatedAdmin.task);
    // console.log(index);
    if (index2 === -1) {
      team.tasksDone.push(updatedAdmin.task);
    } else {
      team.tasksDone = team.tasksDone.filter((t) => t !== updatedAdmin.task);
    }
    team.lastSubmit = new Date().toISOString();
    const updatedTeam = await Team.findByIdAndUpdate(teamID, team, {
      new: true,
    });
    res.status(200).json({ updatedTeam, updatedAdmin });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
