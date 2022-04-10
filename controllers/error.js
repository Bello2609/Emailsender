exports.sendError = (req, res, next)=>{
    res.status(404).render("error", {
        pageTitle: "Error page"
    })
}