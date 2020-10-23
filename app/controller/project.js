const Project = require("../models/Project");
const Users = require("../models/User");
const Organization = require("../models/Organization");
//const post=new Post()
module.exports = {
  create: async (req, res) => {
    console.log(req.params);
    const { projName, description, userId, organizationId } = req.body;
    const currentUser = res.locals.user;
    const findRole = await Organization.findOne(
      { _id: organizationId },
      { users: { $elemMatch: { userId: currentUser.id } } }
    ).exec();
    console.log(findRole);
    if (!findRole)
      res.status(403).json({ success: false, message: "Data Not found" });
    const role = findRole.get("users.role").toString();
    console.log(role);
    if (!["Manager", "Owner"].includes(role)) {
      res.status(403).json({
        success: false,
        message: "you are not authorized for this action",
        result: null,
      });
    } else {
      const orgById = await Organization.findById(organizationId);
      const userById = await Users.findById(currentUser.id);
      const users = { role: "Manager", userId: currentUser.id };
      const projects = await Project.create({
        projName,
        description,
        users,
        organizationId,
      });
      orgById.project.push(projects);
      userById.project.push(projects);
      await userById.save();
      await orgById.save();
      return res.status(200).json({
        success: true,
        message: "User found",
        result: projects,
      });
    }
  },

  find: async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Data Not found" });
    return res.status(200).json({
      success: true,
      message: "Project found",
      result: project,
    });
  },

  findAll: async (req, res) => {
    const finds = await Project.find();
    if (!finds)
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    return res
      .status(200)
      .json({ success: false, message: "Data Found", result: finds });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { projName, description } = req.body;
    const data = res.locals.user;
    const organization = await Project.findById(id);
    if (!organization)
      return res
        .status(404)
        .json({ success: false, message: "Data Not Found" });
    // console.log(organization.organizationId)
    const updateProject = await Project.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );

    const viewById = await Project.findById(id);
    return res.status(200).json({
      success: true,
      message: "Project Updated",
      result: viewById,
    });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const data = res.locals.user;
    const organization = await Project.findById(id);
    if (!organization)
      return res
        .status(404)
        .json({ success: false, message: "Data Not found" });
    const findRole = await Organization.findOne(
      { _id: organization.organizationId },
      { users: { $elemMatch: { userId: data.id } } }
    ).exec();
    const findProjRole = await Project.findOne(
      { _id: id },
      { users: { $elemMatch: { userId: data.id } } }
    ).exec();
    if (!findRole && !findProjRole)
      res.status(403).json({ success: false, message: "Data Not found" });
    const projectRole = findProjRole.get("users.role").toString();
    if (projectRole === "Manager" || projectRole === "Owner") {
      new Promise((resolve, reject) => {
        Project.findOneAndDelete({ _id: id }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        })
          .then((del_proj) =>
            Organization.find({ project: id }).updateOne(
              { $pull: { project: id } },
              (err, next) => {
                if (err) next(err);
                return del_proj;
              }
            )
          )
          .then((del) =>
            Users.find({ project: id }).updateOne(
              { $pull: { project: id } },
              (err, next) => {
                if (err) next(err);
                return del;
              }
            )
          )

          .catch((err) => console.log("error", err))
          .then((result) => {
            res
              .status(200)
              .json({ message: "Data " + id + " Successful Deleted" });
          });
      });
    }
  },
};
