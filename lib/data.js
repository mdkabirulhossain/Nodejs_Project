const fs = require("fs");
const path = require("path");

const lib = {};

// Base directory of the data folder
lib.basedir = path.join(__dirname, "../.data/");

// Ensure directory exists
lib.ensureDirectoryExists = (dir) => {
    const dirPath = path.join(lib.basedir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Write data to file
lib.create = function (dir, file, data, callback) {
    lib.ensureDirectoryExists(dir); // ✅ Ensure the directory exists

    const filePath = path.join(lib.basedir, dir, `${file}.json`);
    
    fs.open(filePath, "wx", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data, null, 2);

            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback("Error closing the new file!");
                        }
                    });
                } else {
                    callback("Error writing to new file");
                }
            });
        } else {
            callback("Could not create new file, it may already exist!");
        }
    });
};

// Read data from file
lib.read = (dir, file, callback) => {
    const filePath = path.join(lib.basedir, dir, `${file}.json`);
    
    fs.readFile(filePath, "utf8", (err, data) => {
        callback(err, data);
    });
};

// Update existing file
lib.update = (dir, file, data, callback) => {
    const filePath = path.join(lib.basedir, dir, `${file}.json`);

    fs.open(filePath, "r+", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data, null, 2);

            fs.ftruncate(fileDescriptor, (err) => {
                if (!err) {
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if (!err) {
                            fs.close(fileDescriptor, (err) => {
                                callback(err ? "Error closing file" : false);
                            });
                        } else {
                            callback("Error writing file");
                        }
                    });
                } else {
                    callback("Error truncating file");
                }
            });
        } else {
            callback("Error updating file, it may not exist");
        }
    });
};

// Delete existing file
lib.delete = (dir, file, callback) => {
    const filePath = path.join(lib.basedir, dir, `${file}.json`);
    
    fs.unlink(filePath, (err) => {
        callback(err ? "Error deleting file" : false);
    });
};

module.exports = lib;
