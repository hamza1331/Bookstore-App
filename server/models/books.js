const mongoose = require('mongoose')

//Defining Book Database Schema
const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    pages:{
        type:Number
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String
    },
    image_url:{
        type:String
    },
    buy_url:{
        type:String
    },
    create_Date:{
        type:Date,
        default:Date.now()
    }
})

//Initializing and connecting to the books Collection with the defined Schema
var Book = module.exports = mongoose.model('books',bookSchema)

//Get all Books function
module.exports.getBooks = function(callback,limit){
    Book.find(callback).limit(limit)
}

//Get a single Book function
module.exports.getBookById = function(id,callback){
    Book.findById(id,callback)          //getBookByIdFunction
}

//Add Book Function
module.exports.addBook = function(book,callback){
    Book.create(book,callback)
}

//Update Book Function
module.exports.updateBook = function(id,book,callback){
    let query = {_id:id}
    let updatedBook = {
        title:book.title,
        genre:book.genre,
        description:book.description,
        pages:book.pages,
        author:book.author,
        publisher:book.publisher,
        image_url:book.image_url,
        buy_url:book.buy_url
    }
    Book.findOneAndUpdate(query,updatedBook,{},callback)
}

//Remove Book Function
module.exports.removeBook = function(id,callback){
    let query = {_id:id}
    Book.remove(query,callback)
}