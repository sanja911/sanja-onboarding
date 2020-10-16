const User = require("../models/User");
const Project = require("../models/Project");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const auth = require("../middleware/auth");
const jwtdecode = require("jwt-decode");
module.exports = {
  create: async (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const { name, username, email } = req.body;
    const user = await User.create({
      name,
      username,
      email,
      password: hash,
    });
    return res.status(200).json(user);
  },
  signin: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      res.status(403).json({ success: false, message: "User Not found" });
    const pass = bcrypt.compareSync(req.body.password, user.password);
    const userInfo = await User.findOne(
      { email: req.body.email },
      { password: pass }
    );
    if (!userInfo)
      res.status(403).json({ success: false, message: "User Not found" });
    const token = jwt.sign({ id: userInfo._id }, config.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      success: true,
      data: { userInfo, token },
    });
  },
  find: async (req, res, next) => {
    const { id } = req.params;
    const find = await User.findById(id);
    if (!find)
      res.status(403).json({ success: false, message: "User Not found" });
    res.status(200).json({
      success: true,
      message: "User found",
      result: find,
    });
  },
  myProject: async (req, res) => {
    const data = res.locals.user;
    const findProject = await User.findOne({ _id: data.id })
      .populate("project")
      .exec();

    if (!findProject)
      res.status(403).json({ success: false, message: "User Not Found" });
    res.status(200).json({
      success: true,
      message: "My Project List",
      result: findProject,
    });
  },
  myOrganization: async (req, res) => {
    const data = res.locals.user;
    const findOrganization = await User.findOne({ _id: data.id })
      .populate("orgId")
      .exec();
    if (!findOrganization)
      res.status(403).json({ success: false, message: "User Not Found" });
    res.status(200).json({
      success: true,
      message: "My Organization List",
      result: findOrganization,
    });
  },
  update: async (req, res) => {
    const data = res.locals.user;
    const { name, username, email, password } = req.body;
    const update = await User.findById({ _id: data.id }).update({
      $set: req.body,
    });
    const viewById = await User.findById(data.id);
    if (!viewById)
      res.status(403).json({ success: false, message: "User Not found" });
    res.status(200).json({
      success: true,
      message: "User Updated",
      result: viewById,
    });
  },
  delete: async (req, res) => {
    const data = res.locals.user;
    new Promise((resolve, reject) => {
      User.findByIdAndDelete(data.id, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
        .then((proj_del) =>
          Project.find({ users: { userId: data.id } }).update(
            { $pull: { users: { userId: data.id } } },
            (err, next) => {
              if (err) next(err);
              return proj_del;
            }
          )
        )
        .then((org_del) =>
          Organization.find({ "users.userId": data.id }).update(
            { $pull: { users: { userId: data.id } } },
            (err, next) => {
              if (err) next(err);
              return org_del;
            }
          )
        )
        .catch((err) => console.log("error :", err))
        .then((result) => {
          res.json({ message: "Data " + data.id + " Successful Deleted" });
        });
      //return res.json(org)
    });
  },
};
