import fs from "fs";
const data = fs.readFileSync("./data/users.json", "utf8");

//იუზერების კონტროლერები
const getUsers = (req, res) => {
    res.json(JSON.parse(data));
}

const createUser = (req, res) => {
    const users = JSON.parse(data);
    const newUser = {...req.body,
        id: Date.now(),
        createdAt: new Date().toISOString()};

    if (!newUser.username || !newUser.password.length) {
        res.status(406).json({message: "username and password are required"});
    }
    //ბექაფის გაკეთება დამატებამდე
    fs.copyFileSync("./data/users.json", `./data/users_backup_${newUser.id}.json`);

    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(201).json(newUser);
}

const editUser = (req, res) => {
    const users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
    const newUser = req.body;
    users[userIndex] = newUser;

    fs.writeFileSync("./data/user.json", JSON.stringify(users));
    res.json(newUser);
}

const deleteUser = (req, res) => {
    const users = JSON.parse(data);

    // Create a backup before deleting თაიმსტამპით
    const backupPath = `./data/users_backup_${Date.now()}.json`;

    fs.writeFileSync(backupPath, JSON.stringify(users));

    const newUsers = users.filter((user) => user.id !== parseInt(req.params.id));

    fs.writeFileSync("./data/users.json", JSON.stringify(newUsers));
    res.status(200).send("USER deleted successfully. Backup created.");
}

export {getUsers, createUser,editUser,deleteUser};