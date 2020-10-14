const Organization = require("../models/Organization");
const User = require("../models/User");
const Project = require("../models/Project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const auth = require("../middleware/auth");
const jwtdecode = require("jwt-decode");
module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    const data = res.locals.user;
    const users = { role: req.body.role, userId: data.id };
    const organization = await Organization.create({
      name,
      users
    });
    const userById = await User.findById(data.id);
    userById.orgId.push(organization);
    await userById.save();
    res.status(200).json({
      success: true,
      message: "Organization Created",
      result: organization
    });
  },

  find: async (req, res) => {
    const { id } = req.params;
    const user = await Organization.findById(id);
    res.status(200).json({
      success: true,
      message: "Organization Find",
      result: user
    });
  },

  findAll: async (req, res) => {
    const finds = await Organization.find();
    res.status(200).json(finds);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const data = res.locals.user;
    const findRole = await Organization.findOne(
      { _id: id },
      { users: { $elemMatch: { userId: data.id } } }
    ).exec();
    const role = findRole.get("users.role").toString();
    if (role === "Manager" || role === "Owner") {
      await Organization.findOneAndUpdate({ _id: id }, { $set: req.body });
      const viewById = await Organization.findById(id);
      res.status(200).json({
        success: true,
        message: "Organization Updated",
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
    let data = res.locals.user;
    const project = await Project.find({ organizationId: id });
    const findRole = await Organization.findOne(
      { _id: id },
      { users: { $elemMatch: { userId: data.id } } }
    ).exec();
    if (!findRole)
      res.status(403).json({ success: false, message: "Data Not found" });
    const role = findRole.get("users.role").toString();
    if (role === "Manager" || role === "Owner") {
      new Promise((resolve, reject) => {
        Organization.findOneAndDelete({ _id: id }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        })
          .then(del =>
            User.find({ orgId: id }).updateOne(
              { $pull: { orgId: id } },
              (err, next) => {
                if (err) next(err);
                return del;
              }
            )
          )
          .then(del_proj =>
            Project.find({ organizationId: id }).deleteMany(
              { organizationId: id },
              (err, next) => {
                if (err) next(err);
                return del_proj;
              }
            )
          )
          .then(del_uproj =>
            User.find({ project: project._id }).update(
              { $pull: { project: project._id } },
              (err, next) => {
                if (err) next(err);
                return del_uproj;
              }
            )
          )
          .then(result => {
            res
              .status(200)
              .json({ message: "Data " + id + " Successful Deleted" });
          });
      });
    }
  }
};
