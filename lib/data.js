const fs = require('fs');
const path = require('path');

const lib = { };

//base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

//write data to file
lib.create = function(dir, file, data, callback){
    //open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', function(err, fileDescriptor){
        if(!err &&  fileDescriptor){
            //convert data to String
            const StringData = JSON.stringify(data);

            //write data to file and then close it
            fs.writeFile(fileDescriptor, StringData, function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing the new file!');
                        }
                    })
                }else{
                    callback('Error writing to new file');
                }
            })

        }else{
            callback('could not create new file, It may already exists!!');
        }
    })
    
};

//read data from file

lib.read = (dir, file, callback)=>{
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data)=>{
        callback(err, data);
    })
}

//Update existing file
//use arrow function
lib.update = (dir, file, data, callback) =>{
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', function(err, fileDescriptor){
        if(!err &&  fileDescriptor){
            //Covert the data to string
            const stringData = JSON.stringify(data);

            //truncate(empty) the file
            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err){
                    //write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err){
                            //close the file
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback('error closing file');
                                }
                            })
                        }else{
                            callback('Error writing file');
                        }
                    })

                }else{
                    console.log(`Error truncate file!!`);
                }
            })

        }else{
            console.log(`Error udating file may not exist`);
        }

    })
}

module.exports = lib;