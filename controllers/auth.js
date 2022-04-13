const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const nodemailer = require("nodemailer");
const sendGridTransport  = require("nodemailer-sendgrid-transport");

const mailer = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: process.env.API_KEY
    }
}))
exports.getLogin = (req, res, next)=>{
    let message = req.flash("error");
    if(message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render("auth/login", {
        pageTitle: "Log In",
        path: "/login",
        errorMessage: message

    })
}
exports.postLogin = (req, res, next)=>{
    const { email, password } = req.body;
    User.findOne({email: email})
    .then(user=>{
        if(!user){
            req.flash("error", "Invalid email or password");
            res.redirect("/login");
        }
        return bcrypt.compare(password, user.password).then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err=>{
                    res.redirect("/");
                    console.log(err);
                })
            }
            req.flash("error", "Sorry the password you enter is incorrect");
            res.redirect("/login");
        }).catch(err=>{
            console.log(err);
            res.redirect("/login");
        })
    })
    .catch(err=>{
        console.log(err);
        
    })
}
exports.getSignUp = (req, res, next)=>{
    let message = req.flash("error");
    if(message.length > 0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render("auth/signup", {
        pageTitle: "Sign Up",
        path: "/signup",
        errorMessage: message
    })
}
exports.postSignUp = (req, res, next)=>{
    const { name, email, password } = req.body;
    User.findOne({ email: email }).then(userInfo => {
        if(userInfo){
            req.flash("error", "The email you entered has already been used");
            res.redirect("/signup");
        }
        return bcrypt.hash(password, 12).then(hashPassword=>{
            const user = new User({
                name: name,
                email: email,
                password: hashPassword
            });
            return user.save();
        }).then(result=>{
            res.redirect("/login");
            return mailer.sendMail({
                to: "bellohadi82@gmail.com",
                from : "bellohadi82@gmail.com",
                subject: "Congratulation your accout has been created",
                html: "<h3>your account has been created succesfully kindly login to your account to update your profile</h3>"
            });
        }).catch(err=>{
            console.log(err);
        });
    }).catch(err=>{
        console.log(err);
    })
}
exports.postLogOut = (req, res, next)=>{
        req.session.destroy(err=>{
            console.log(err);
            res.redirect("/login");
    })
}