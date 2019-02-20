const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const VfMiddleware = (req, res, next) => {
  req.query.age ? next() : res.redirect('/')
}

app.get('/', (req, res) => {
  res.render('form')
})

app.post('/check', (req, res) => {
  req.body.age >= 18 ? res.redirect(`/major?age=${req.body.age}`) : res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/minor', VfMiddleware, (req, res) => {
  return res.send(`Você é menor de idade e possui ${req.query.age} anos `)
})

app.get('/major', VfMiddleware, (req, res) => {
  return res.send(`Você é maior de idade e possui ${req.query.age} anos `)
})

app.listen(3000)
