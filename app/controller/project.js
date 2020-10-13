const Project = require("../models/Project");
const Users = require("../models/User");
const Organization = require("../models/Organization");
const { NotExtended } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const auth = require("../middleware/auth");
const jwtdecode = require("jwt-decode");
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
    if (!findRole)
      res.status(403).json({ success: false, message: "Data Not found" });
    const role = findRole.get("users.role").toString();
    const users = { role: req.body.role, userId: req.body.userId };
    const orgById = await Organization.findById(organizationId);
    const userById = await Users.findById(currentUser.id);
    const usersById = await Users.findById(users.userId);
    if (role === "Manager" || role === "Owner") {
      const projects = await Project.create({
        projName,
        description,
        users,
        organizationId
      });
      orgById.project.push(projects);
      userById.project.push(projects);
      usersById.project.push(projects);
      projects.users.push({ role: "Manager", userId: currentUser.id });
      await userById.save();
      await projects.save();
      await usersById.save();
      await orgById.save();
      res.status(200).json({
        success: true,
        message: "User found",
        result: projects
      });
    } else {
      res.status(401).json({
        success: false,
        message: "you are not authorized for this action",
        result: null
      });
    }
  },

  find: async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      res.status(403).json({ success: false, message: "Data Not found" });
    res.status(200).json({
      success: true,
      message: "Project found",
      result: project
    });
  },
  findAll: async (req, res) => {
    const finds = await Project.find();
    res.status(200).json(finds);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { projName, description } = req.body;
    const data = res.locals.user;
    const organization = await Project.findById(id);
    // console.log(organization.organizationId)
    const findProjRole = await Project.findOne(
      { _id: id },
      { users: { $elemMatch: { userId: data.id } } }
    ).exec();
    const projectRole = findProjRole.get("users.role").toString();
    if (projectRole === "Manager" || projectRole === "Owner") {
      const updateProject = await Project.findOneAndUpdate(
        { _id: id },
        { $set: req.body }
      );
      const viewById = await Project.findById(id);
      res.status(200).json({
        success: true,
        message: "Project Updated",
        result: viewById
      });
    } else {
      res.status(401).json({
        success: false,
        message: "you are not authorized for this action",
        result: null
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const data = res.locals.user;
    const organization = await Project.findById(id);
    if (!organization)
      res.status(403).json({ success: false, message: "Data Not Found" });
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
    const role = findRole.get("users.role").toString();
    const projectRole = findProjRole.get("users.role").toString();
    if (projectRole === "Manager" || projectRole === "Owner") {
      new Promise((resolve, reject) => {
        Project.findOneAndDelete({ _id: id }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        })
          .then(del_proj =>
            Organization.find({ project: id }).updateOne(
              { $pull: { project: id } },
              (err, next) => {
                if (err) next(err);
                return del_proj;
              }
            )
          )
          .then(del =>
            Users.find({ project: id }).updateOne(
              { $pull: { project: id } },
              (err, next) => {
                if (err) next(err);
                return del;
              }
            )
          )

          .catch(err => console.log("error", err))
          .then(result => {
            res
              .status(200)
              .json({ message: "Data " + id + " Successful Deleted" });
          });
      });
    } else {
      res.status(401).json({
        success: false,
        message: "you are not authorized for this action",
        result: null
      });
    }
  }
};
