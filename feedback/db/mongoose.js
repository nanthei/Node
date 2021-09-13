//    .\mongod.exe --dbpath='C:\Users\toshiba satellite\Desktop\BIT\mongoDB\data'

const mongoose=require('mongoose');

const connectionURL='mongodb://127.0.0.1:27017';
const dbName='feedback';
//Mongoose naudodamasis mongodb biblioteja jungiasi prie MongoDB
mongoose.connect(connectionURL+'/'+dbName, {
});
