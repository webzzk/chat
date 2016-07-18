/**
 * Created by evanz on 2016/7/5.
 */
var formidable = require('formidable');
var UserModel = require('../model/user.js');

exports.showIndex = function (req, res) {
    res.render('ind', {
        login: req.session.login || "1",
        username: req.session.username || ""
    });
};

exports.showRegist = function (req, res) {
    res.render('reg', {
        login: "1",
        username: ""
    });
};

exports.doRegist = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        //console.log(fields);
        if (fields.username && fields.userpwd) {
            UserModel.findByUsername(fields.username, function (err, result) {
                if (err) {
                    res.send('2');
                    return;
                }
                if (result[0]) {
                    res.send('1');
                    return;
                }
                UserModel.create({username: fields.username, password: fields.userpwd}, function (err, result) {
                    if (err) {
                        res.send('2');
                        return;
                    }
                    req.session.login = "0";
                    req.session.username = fields.username;
                    res.send('0');
                });
            });
        } else {
            res.send('3');
        }
    });
};

exports.doLogin = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        UserModel.findByUsername(fields.username, function (err, result) {
            if (result[0]) {
                if (result[0].password == fields.userpwd) {
                    req.session.login = "0";
                    req.session.username = fields.username;
                    res.send("0");
                } else {
                    res.send("1");
                }
            } else {
                res.send("2");
            }
        })
    })
};

exports.showChat = function (req, res) {
    if (req.session.login == "0") {
        res.render("chat", {
            login: req.session.login,
            username: req.session.username
        })
    } else {
        res.render("chat", {
            login: "1",
            uesrname: ""
        })
    }
};

exports.doExit = function(req,res){
    req.session.login = "1";
    req.session.username = "";
    res.send("OK");
};