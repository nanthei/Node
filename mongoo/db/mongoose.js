//    .\mongod.exe --dbpath='C:\Users\toshiba satellite\Desktop\BIT\mongoDB\data'

const mongoose=require('mongoose');
const validator=require('validator');

const connectionURL='mongodb://127.0.0.1:27017';
const dbName='uzrasai';
//Mongoose naudodamasis mongodb biblioteja jungiasi prie MongoDB
mongoose.connect(connectionURL+'/'+dbName, {
});

//Susikuriame modeli (kaip atrodys duomenys DB ir objektai)
const Comment = mongoose.model('Comment',{
    name:{
        type:String,
        required:true,
        trim:true
        //default:'nenurodytas'

    },
    text:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
        min:18
    },
    salary:{
        type:Number,
        //Papildomai tikriname ar daugiau už 0 ir mažiau už 10000
        validate(value){
            if (value<0 || value>10000){
                throw new Error("Atlyginimas turi būti daugiau už 0 ir mažiau už 10000")
            }
        }
    },
    email:{
        type:String,
        validate(value){
            //Jei įvestas ne el. paštas
            if (!validator.isEmail(value)){
                throw new Error('El paštas neteisingas');
            }
        }
    },
});
/*
//Talpiname naują įrašą į DB
const nc=new Comment({
    name:'Jonas',
    text:'Labai įdomus straipsnis',
    age:25
});
*/
const nc=new Comment({
    name:" Jonas Jonaitis   ",
    text:'Kazkas ',
    age:20,
    salary:80,
    email:'g.gric@asd.lt'
});
nc.save().then((nc)=>{
    console.log(nc);
}).catch((error)=>{
    console.log(error);
    /*
    for (const [k,m] of Object.entries(error.errors)){
        console.log(k);
    }
  */
    
});