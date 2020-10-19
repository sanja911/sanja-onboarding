const Task = require("../models/Task");
const Project = require("../models/Project");

module.exports = {
  create: async (req, res) => {
    const {
      projectId,
      summary,
      description,
      createdBy,
      dueDate,
      status,
      assignee,
    } = req.body;
    const userById = await Project.findById(projectId);
    if (!userById)
      res.status(404).json({ success: false, message: "Data Not Found" });
    const tasks = await Task.create({
      projectId,
      summary,
      description,
      createdBy,
      dueDate,
      status,
      assignee,
    });
    userById.task.push(tasks);
    await userById.save();
    return res.json(tasks);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task)
      res.status(404).json({ success: false, message: "Data Not Found" });
    return res.json(task);
  },
  findAll: async (req, res) => {
    const data = res.locals.user;
    const find = await Project.find({
      users: { $elemMatch: { userId: data.id } },
    });
    const task = await Task.find();
    return res
      .status(200)
      .json({ success: true, message: "Task Found", result: find });
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task)
      res.status(404).json({ success: false, message: "Data Not Found" });
    const {
      summary,
      description,
      createdBy,
      dueDate,
      status,
      assignee,
    } = req.body;
    await Task.findOneAndUpdate({ _id: id }, { $set: req.body });
    const viewById = await Task.findById(id);
    return res.status(200).json(viewById);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task)
      res.status(404).json({ success: false, message: "Data Not Found" });
    new Promise((resolve, reject) => {
      Task.findByIdAndDelete(id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
        .then((del_proj) =>
          Project.find({ task: id }).updateOne(
            { $pull: { task: id } },
            (err, next) => {
              if (err) next(err);
              return del_proj;
            }
          )
        )
        .catch((err) => console.log("error ", err))
        .then((result) => {
          return res
            .status(200)
            .json({ message: "Data " + id + " Successful Deleted" });
        });
    });
  },
};
