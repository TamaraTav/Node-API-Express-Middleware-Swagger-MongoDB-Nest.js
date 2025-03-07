import express from "express";

import {getUsers, createUser,editUser,deleteUser} from "../controllers/userController.js";

const usersRouter = express.Router();//როუტერი იუზერებისთვის

//ეს როუტები არის იუზერებისთვის
usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/:id").put(editUser).put(deleteUser);

export default usersRouter;