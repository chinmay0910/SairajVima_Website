const homeController = (req, res) =>{
    res.render('index.ejs')
}

const comingsoon = (req, res) =>{
    res.render('commingsoon.ejs')
}


module.exports = { homeController, comingsoon } 