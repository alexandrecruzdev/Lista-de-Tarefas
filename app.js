const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let homeTasks = ["Comprar comida","Cozinhar Comida","Comer Comida"]
let workTasks = []
let today = new Date()

const options = {
    week: 'long', year:'numeric', month:'long', day:'numeric'
}

const todayString = today.toLocaleDateString('pt-BR', options)

const deleteItem = () => {
    console.log("clickou")
}

app.get("/",function (req,res) {
    
    res.render('list',{Title:todayString, Tasks:homeTasks, DeleteItem: deleteItem()})
})

app.get("/work",function(req,res) {
    res.render("list",{Title:"Work List", Tasks:workTasks})
})

app.post("/",function(req,res) {
   const task = req.body.work

   if(req.body.list === "Work") {
    console.log(req.body)
    workTasks.push(task)
    res.redirect("/work")
   } else {
    console.log(req.body)
    homeTasks.push(task)
    res.redirect("/")
   }
  
})






app.listen(3000, function(){
    console.log("Server is running in port 3000")
})