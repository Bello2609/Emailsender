const Messages = require("../model/messages");
exports.getIndex = (req, res, next)=>{
    res.render("index", {
        pageTitle: "Home",
        path: "/" 
    })
}
exports.postMessage = (req, res, next)=>{
    const { fullname, email, reci_email, description } = req.body;

    const messages = new Messages({
        fullname: fullname,
        email: email,
        recipientmail: reci_email,
        message: description
    });
    return messages.save();
}