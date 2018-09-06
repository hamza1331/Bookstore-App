const mongoose = require('mongoose') //Importing Mongoose

//Defining Database Schema
const genreSchema = mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    create_Date:{
        type:Date,
        default:Date.now()
    }
})
//Initializing and connecting to the Collection with the defined Schema
var Genre = module.exports = mongoose.model('Genre',genreSchema)

//Get all genres function
module.exports.getGenre = function(callback,limit){
    Genre.find(callback).limit(limit)
}

//Add Genre Function
module.exports.addGenre = function(genre,callback){
    Genre.create(genre,callback)
}

//Update Genre Function
module.exports.updateGenre = function(id,genre,callback){
    let query = {_id:id}
    let updatedGenre = {
        name:genre.name
    }
    Genre.findOneAndUpdate(query,updatedGenre,{},callback)
}

//Remove Genre Function
module.exports.removeGenre = function(id,callback){
    let query = {_id:id}
    Genre.remove(query,callback)
}