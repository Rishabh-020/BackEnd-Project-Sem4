const crypto = require("crypto");
const {readFile,writeFile}=require("../utils/file.util")
exports.createUser=(req,res)=>{
    const user=readFile();
    const newUser={
        id:crypto.randomUUID(),
        ...req.body
    };
    user.push(newUser);
    writeFile(user);
    res.status(201).json(newUser);
}
exports.getUser=(req,res)=>{
    const data=readFile();
    res.json(data);
}

exports.getUserId = (req, res) => { 
    const users = readFile(); 
    const user = users.find(u => u.id === req.params.id); 
    if (!user) { 
        return res.status(404).json({ message: "User not found" }); 
    } 
    res.json(user); 
};
exports.updateUser=(req,res)=>{
    const users=readFile();
    const index = users.findIndex(u => u.id === req.params.id); 
    if (index === -1) { 
        return res.status(404).json({ message: "User not found" }); 
    } 
    users[index] = { ...users[index], ...req.body }; 
    writeFile(users); 
    res.json(users[index]); 
}
exports.deleteUser = (req, res) => { 
    const users = readFile(); 
    const filteredUsers = users.filter(u => u.id !== req.params.id); 
    writeFile(filteredUsers); 
    res.json({ message: "User deleted successfully" }); 
};