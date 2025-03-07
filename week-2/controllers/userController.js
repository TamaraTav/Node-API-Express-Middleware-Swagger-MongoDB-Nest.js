import fs from "fs";
const data = fs.readFileSync("./data/users.json", "utf8");

//იუზერების კონტროლერები
const getUsers = (req, res) => {
    res.json(JSON.parse(data));
}
const createUser = (req, res) => {
    res.send("create new user");
}
const editUser = (req, res) => {
    res.send("edit new user");
}
const deleteUser = (req, res) => {
    res.send("delete  user");
}

export {getUsers, createUser,editUser,deleteUser};