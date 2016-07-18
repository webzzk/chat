/**
 * Created by evanz on 2016/7/5.
 */
var mongoose = require('mongoose'),
    db = require('./db.js');

var contentSchema = new mongoose.Schema({
    content     :   String,
    data        :   String
});

var chatSchema = new mongoose.Schema({
    users       :   [{user1:String,list:}],
    username    :   String,
    password    :   String,
    friends     :   [{username:String,minename:String}]
});