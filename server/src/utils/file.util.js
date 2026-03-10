// const fs=require("fs");
// const path=require("path");
// const dir_path=path.join(__dirname,"../../data/users.json");
// const readFile=()=>{
//     const data=fs.readFileSync(dir_path,"utf-8");
//     return JSON.parse(data);
// }
// const writeFile=(data)=>{
//     fs.writeFileSync(dir_path,JSON.stringify(data,null,2))
// }

// module.exports={readFile,writeFile};


const fs = require("fs");
const path = require("path");

// Generic read function
const readFile = (filePath) => {
  // create file if not exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Generic write function
const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readFile, writeFile };