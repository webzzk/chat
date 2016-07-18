/**
 * Created by evanz on 2016/7/5.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/user");

db.once('open',function(){
    console.log('数据库开启');
});

exports.db = db;