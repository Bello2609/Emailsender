const Messages = require("../model/messages");
const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");



exports.getIndex = (req, res, next)=>{
    res.render("index", {
        pageTitle: "Home",
        path: "/" 
    })
}
exports.postMessage = (req, res, next)=>{
    const { fullname, email, reci_email, description } = req.body;

    const message = new Messages({
        sendername: fullname,
        email: email,
        recipientmail: reci_email,
        messages: description,
        usersDetails: req.user
    });
    message.save().then(message=>{
        res.redirect("/");
    }).catch(err=>{
        console.log(err);
    });
}