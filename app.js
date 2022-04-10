const express = require("express");
const path  = require("path");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session); 
const flash = require("connect-flash");
const csurf = require("csurf");
//route
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const error = require("./controllers/error");
//mongoose
const mongoose = require("mongoose");
// user
const User = require("./model/user");
app.use(express.static(path.join(__dirname, "public")));

const MONGODB_URI = "mongodb+srv://bellohadi:bellohadi@cluster0.4hiah.mongodb.net/emailsender";

app.use( bodyparser.urlencoded({extended: false}));
const csurfProtection = csurf();
const store = new mongoDbStore({
    uri: MONGODB_URI,
    collection: "session"
})


//session
app.use(session({
    secret: "i dont give a fuck",
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csurfProtection);
app.use(flash());

app.use((req, res, next)=>{
    if(!req.session.user){
       return next(); 
    }
    User.findById(req.session.user._id).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        console.log(err);
    })
});
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csurf = req.csrfToken();
    next();
});

app.set("view engine", "ejs");
app.set("views", "views");
//router
app.use(authRouter);
app.use(userRouter);

//error code 404
app.use(error.sendError);
mongoose.connect(MONGODB_URI)
.then(res=>{
    console.log(res);
    app.listen(5050, ()=>{
        console.log("your server is running at 5050");
    })

}).catch(err=>{
    console.log(err);
})