// Your code here
let express = require('express')
let layouts = require('express-ejs-layouts')
let db = require('./models')
let methodOverride = require('method-override')
// creata an app instance
let app = express()

app.use(methodOverride('_method'))
// set template language to ejs
app.set('view engine','ejs')
//Tell express to use the layout modules
app.use(layouts)
// Set up static folder with 
app.use(express.static('static'))

app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
     res.render('indexMain');
  });

 app.get('/site/about', function(req, res) {
    res.render('site/about');
 })

 app.get('/site/contact', function(req, res) {
    res.render('site/contact');
 })



app.get('/articles', function(req, res) {
    db.articles.findAll()
    .then(allArticles=>{
        res.render('articles/index',{allArticles});
    })
    .catch(err=>{
        console.log('Error',err)
        res.send('Uh Oh')
    })
  });

app.get('/articles/new', function(req, res) {
    res.render('articles/new');
 });  

app.post('/articles', function(req, res) {
    titleLength = Object.keys(req.body.title).length;
    contentLength = Object.keys(req.body.content).length;
    authorLength = Object.keys(req.body.content).length;
    if(titleLength!= 0 && contentLength!=0 && authorLength!= 0)
    { 
        db.articles.create(req.body)
        .then(newArticle=>{
            console.log('Added in DB',req.body)
            res.redirect('/articles');
        })
        .catch(err=>{
            console.log('Error',err)
            res.send('Error - check logs!')
        })
    }
    else{
        console.log('Fields are empty')
    }
 });  

 app.delete('/articles',(req,res)=>{
     db.articles.destroy({
         where: {id: req.body.id}
     }).then(deletedArt=>{
         res.redirect('/articles')
     })
 })

 app.get('/articles/:id',(req,res)=>{
     console.log(req.params.id);
     db.articles.findOne({
        where: {id: req.params.id}
      }).then(function(art) {
        console.log('art',art)
         if(art!=null) {
            res.render('articles/show',{articles: art , message: ""})
         }
         else{
            res.render('articles/show',{message:"There is no such article"})
         }
         
      });

    
    
 })

 app.listen(3000)
