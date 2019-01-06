var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/* User Schema Fields/Attrubutes*/
var UserSchema = new  Schema({
 email:{type:String,unique:true,lowercase:true},

 password:{type:String},

 profile:{
   name:{type:String,default:''},
   picture:{type:String,default:''}
 },

 address:{type:String},

 history:[{
   date:Date,
   paid:{type:Number,default:0}
   //item:{type:Schema.Types.ObjectId,ref:''}
 }]

});


/*Method  to decrypt the password before saving into database*/
UserSchema.pre('save',function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10,function(err,salt){
    if(err) return next(err);
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err) return next(err);
      user.password=hash;
      next();
    })
  })
});

/*Compare the password with stored and one which user type in*/
UserSchema.methods.comparePassword=function(password){
  return bcrypt.cpmpareSync(password,this.password);
}

module.exports=mongoose.model('User',UserSchema);
