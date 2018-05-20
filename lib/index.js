const fs = require('fs');

// Delete the 0 and 1 argument (node and script.js)
let args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
const websiteName = args[0] === undefined ? "your_website" : args[0];

const currentDir = process.cwd();

let lib = {};

lib.makeWebDir = (callback) => {
  fs.mkdir(`${currentDir}/${websiteName}`, err => {
    if (err) {
      callback("Error creating folder: " + websiteName + ". Maybe it already exists.");
      process.exit();
    }
    else {
      callback("Success: Created folder " + websiteName);
    }
  })
};

lib.create = (file, data, callback) => {
  const path = `${currentDir}/${websiteName}/${file}`;
  fs.open(path, "wx", (err, fileDescriptor) => {
    if (!err) {
      const stringData = JSON.stringify(data);
      const res = stringData.replace(/Page Title/, websiteName);
      const replacedData = JSON.parse(res);
      fs.writeFile(fileDescriptor, replacedData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, function(error) {
            if (!error) {
              callback("Success: Created " + file);
            }
            else {
              callback("Error closing new file")
            }
          });
        }
        else {
  
        }
      });
    }
    else {
      callback("Error: Could not create file: " + path + ". Maybe it already exists.");
    }
  });
}

module.exports = lib;