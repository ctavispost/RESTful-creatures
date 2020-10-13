// require statements
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const fs = require('fs')



// Middleware
// set the view engine to ejs
app.set('view engine', 'ejs')

// use ejsLayouts
app.use(ejsLayouts)

// form data parsing and store in req.body
app.use(express.urlencoded({ extended: false }))



// Routes
app.get('/', function (req, res) {
  res.render('home')
})

// get all dinosaurs
app.get('/dinosaurs', function (req, res) {
  // read in data from JSON file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  // parse JSON data to regular JS Object
  const dinoData = JSON.parse(dinosaurs)
  // render template and pass array of dinos
  res.render('dinosaurs/index', { myDinos: dinoData, title: 'All Dinos' })
})

// get new dinosaur form
app.get('/dinosaurs/new', function(req, res) {
  res.render('dinosaurs/new', { title: "New Dino" })
})

// get one dinosaur
app.get('/dinosaurs/:idx', function (req, res) {
  // read in data from JSON file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // get the array index from the url parameter
  const dinoIndex = parseInt(req.params.idx)

  // render template with data of one dinosaur
  res.render('dinosaurs/show', { myDino: dinoData[dinoIndex], title: 'Show' })
})

// post/create dinosaur with form data
app.post('/dinosaurs', function(req, res) {
  // read in data from JSON file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // add the new item (in req.body) to the array dinoData
  dinoData.push(req.body)

  // save the dinoData array to the dinosaurs.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // send user to the dinosaurs index page
  res.redirect('/dinosaurs')
})


// listen...
app.listen(3000)