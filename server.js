const express = require("express")
const app = express()

app.set('view engine','ejs')
app.get("/", (req,res) => {
    console.log('here')
    res.render("final prototype")
   
    })
    

app.listen(3000)