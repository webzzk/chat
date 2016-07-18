/**
 * Created by evanz on 2016/7/5.
 */
var mongoose = require('mongoose'),
    db = require('./db.js');

var userSchema = new mongoose.Schema({
    nickname    :   String,
    username    :   String,
    password    :   String,
    uid         :   Number,
    friends     :   [{username:String,minename:String}]
});

userSchema.index({'uid':1});

userSchema.statics.findByUsername = function(un,callback){
    return this.model("user").find({username:un},callback);
};

var UserModel = db.db.model('user',userSchema);

module.exports = UserModel;