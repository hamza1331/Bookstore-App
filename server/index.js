//Imports
const express = require('express')
const app = express()
const process = require('process')
const bodyParser = require('body-parser')
const mongooose = require('mongoose')
const Genre = require('./models/genre')
const Book = require('./models/books')
const User = require('./models/User')
const UserSession = require('./models/UserSession')
const port = process.env.PORT || 8000
app.use(bodyParser.json())  //Body Parser MiddleWare

mongooose.connect('mongodb://localhost:27017/bookstore') //MongoDB connection using Mongoose
var db = mongooose.connection //Mongo Connection Instance

app.get('/',function(req,res){  //HomePage for API
    res.send('Hello world form Bookapp...')
})

//Get all Genres
app.get('/api/genres',function(req,res){
    Genre.getGenre(function(err,genres){
        if(err)throw err

        res.json(genres)
    })
})

//Insert a Genre
app.post('/api/genres',function(req,res){
    let genre = req.body
    Genre.addGenre(genre,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})
//Update a Genre
app.put('/api/genres/:_id',function(req,res){
    let id = req.params._id
    let genre = req.body
    Genre.updateGenre(id,genre,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})

//Delete a Genre
app.delete('/api/genres/:_id',function(req,res){
    let id = req.params._id
    Genre.removeGenre(id,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})

//Get all Books
app.get('/api/books',function(req,res){
    Book.getBooks(function(err,books){
        if(err)throw err
        res.json(books)
    })
})

//Insert a Book
app.post('/api/books',function(req,res){
    let book = req.body
    Book.addBook(book,function(err,book){
        if(err)throw err;
        res.json(book)
    })
})

 //get single Book By Id
app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id,function(err,book){
        if(err)throw err

        res.json(book)
    })
})

//Update a Book
app.put('/api/books/:_id',function(req,res){
    let id = req.params._id
    let book = req.body
    Book.updateBook(id,book,function(err,book){
        if(err)throw err
        res.json(book)
    })
})

//Delete a Book
app.delete('/api/books/:_id',function(req,res){
    let id = req.params._id
    Book.removeBook(id,function(err,book){
        if(err)throw err

        res.json(book)
    })
})
/* ******************** Login ************************* */
app.post('/api/accounts/signup',(req,res)=>{
    const {body} = req
    let {
        firstName,lastName,email,password
    } = body
    if(!firstName){return res.send({success:false,message:"User must must have First Name"})}
    if(!email){return res.send({success:false,message:"User must must have Email"})}
    if(!password){return res.send({success:false,message:"User must must have Password"})}
    if(!lastName){return res.send({success:false,message:"User must must have Last Name"})}
    email = email.toLowerCase()
    User.find({
        email:email
    },(err,prevUser)=>{
        if(err){console.error(err);return res.send({success:false,message:"Internal Server Error"})}
        else if(prevUser.length>0){return res.send({success:false,message:"User already exist"})}
        
        let newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password)
        newUser.save((err,user)=>{
            if(err){
                console.error(err);
                return res.send({success:false,message:"Internal Server Error"})
            }
            return res.send(user)
        })
    })
})
app.post('/api/accounts/signin',(req,res)=>{
  const {body} = req
  let {
      email,password
  } = body
  email = email.toLowerCase()
  if(!email){return res.send({success:false,message:"User must must have an Email"})};
  if(!password){return res.send({success:false,message:"User must must have a Password"})}
  User.find({email:email},(err,users)=>{
      if(err){
          return res.send({success:false,message:'Internal Server Error'})
      }
      if(users.length!=1){
          return res.send({success:false,message:'Invalid Login'})
      }
      const user = users[0]
      if(!user.validPassword(password)){
          return res.send({success:false,message:'Invalid Password'})
      }
      let userSession = new UserSession()
      userSession.userId = user._id
      userSession.save((err,doc)=>{
          if(err){
              return res.send({success:false,message:'Internal Server Error'})
          }
          return res.send({
              success:true,
              message:'Sign in Succesfully',
              token:doc._id
          })
      })


  })

})
app.get('/api/accounts/verify/:token',(req,res)=>{
const {token} = req.params
console.log(token)
UserSession.findOne({userId:token},(err,session)=>{
    if(err){
        return res.send({success:false,message:"Internal Server Error"})
    }
    if(!session.isDeleted)
        return res.send({
            success:true,
            message:'Good'
        })
    else
    return res.send({success:false,message:"Session deleted"})
    
})
})
app.post('/api/accounts/logout',(req,res)=>{
const {token} = req.body
// UserSession.findByIdAndUpdate(token,$set({isDeleted:true}),null,(err,session)=>{
//     if(err){
//         return res.send({success:false,message:"Internal Server Error"})
//     }
//     return res.send({success:true,message:"Session deleted"})
    
// })
UserSession.findOneAndUpdate({userId:token}, { $set: { isDeleted: true }}, { new: true },  (err, session)=>{
        if(err){
        console.error(err)
        return res.send({success:false,message:"Internal Server Error"})
    }
    return res.send({success:true,message:"Session deleted"})
})
})

//Server
app.listen(port,function(){
    console.log('Listening on port'+port)
})