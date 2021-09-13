const mongoose=require('mongoose');
const validator=require('validator');

const Feedback=mongoose.model('Feedback',{
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:24
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        maxLength:32,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('El paštas neteisingas');
            }
        }
    },
    text:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports=Feedback;