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

    const index = admin.passed.findIndex(
      (team) => String(team) === String(teamID)
    );
    // console.log(index);
    if (index === -1) {
      admin.passed.push(String(teamID));
    } else {
      admin.passed = admin.passed.filter(
        (team) => String(team) !== String(teamID)
      );
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
      new: true,
    });
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
