import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  const { teamName } = req.body;
  const team = new Team({ teamName, lastSubmit: new Date().toISOString() });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ tasksDone: -1, lastSubmit: 1 });
    res.status(200).json(teams);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const team = await Team.findById(id);

    const index = team.tasksDone.findIndex((t) => t === task);
    // console.log(index);
    if (index === -1) {
      team.tasksDone.push(task);
    } else {
      team.tasksDone = team.tasksDone.filter((t) => t !== task);
    }
    team.lastSubmit = new Date().toISOString();
    const updatedTeam = await Team.findByIdAndUpdate(id, team, {
      new: true,
    });
    res.status(200).json(updatedTeam);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
