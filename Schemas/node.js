const { default: mongoose } = require('mongoose');
const Db =require('mongoose');
const noteSchema =new Db.Schema({
 title : {type:String ,required : true},
 content :{type:String  ,required : true},
 CreatedDate : {type:Date ,required : true},
updatedDate : {type: Date ,required : true},

})

module.exports=mongoose.model('Note',noteSchema);