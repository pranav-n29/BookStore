const express = require('express');
const router = express.Router();
const bigPromise=require("../middlewares/bigPromise");
const customError=require("../utils/customError");
const bookModel=require("../models/bookModel");


//home
exports.home=bigPromise(async(req,res,next)=>{
    console.log("home");
    res.status(200).json({
        success:true,
        message:"Welcome to the home page"
    });
});

//create book
exports.createBook=bigPromise(async(req,res,next)=>{
  try {
    const{title, author, genre, year, pages, publisher, description}=req.body;
    if(!title || !author || !genre || !year || !pages || !publisher || !description){
      return next(new customError("Please provide all the required fields", 400));
    }
    const newBook=new bookModel({
      title, author, genre, year, pages, publisher, description, createdBy: req.user._id
    });
    const book=await newBook.save();
    res.status(201).json({
      success:true,
      data:book
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new customError("A book with this title already exists for this user.", 409));
    }

    return next(error);
  }

});


//get all books
exports.getAllBooks=bigPromise(async(req,res,next)=>{
  const books=await bookModel.find({ createdBy: req.user._id });
    res.status(200).json({
        success:true,
        count:books.length,
        data:books
    });
});


//get single book
exports.getSingleBook=bigPromise(async(req,res,next)=>{
  const book=await bookModel.findOne({ _id: req.params.id, createdBy: req.user._id });
    if(!book){
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        success:true,
        data:book
    });
});


// Update book
exports.updateBook = bigPromise(async (req, res, next) => {
    try {
      const bookId = req.params.id;
  const { title, author, genre, year, pages, publisher, description } = req.body;
  
      if (!bookId) {
        return next(new customError("Please provide book id", 400));
      }
      if (!title || !author || !genre || !year || !pages || !publisher || !description) {
        return next(new customError("Please provide all the required fields", 400));
      }
  
      const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId, createdBy: req.user._id }, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedBook) {
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
      }
  
      res.status(200).json({
        success: true,
        data: updatedBook,
      });
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate key error handling for title field
        return next(
          new customError("A book with the same title already exists.", 400)
        );
      } else {
        // Handle other errors or rethrow this error
        console.error('Error during update:', error);
        return next(error);
      }
    }
  });
  


//delete book
exports.deleteBook=bigPromise(async(req,res,next)=>{
    const bookId=req.params.id;
    if(!bookId){
        return next(new customError("Please provide book id", 400));
    }
    const deletedBook=await bookModel.findOneAndDelete({ _id: bookId, createdBy: req.user._id });
    if(!deletedBook){
        return next(new customError(`Book with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        message:`Book with id ${req.params.id} deleted successfully`,
        success:true,
    });
});
