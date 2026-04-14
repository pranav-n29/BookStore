const mongoose = require('mongoose');
const validator = require('validator');

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Book title is required'],
        maxlength: [50, 'Book title cannot exceed 50 characters'],
        trim: true
    },
    author:{
        type: String,
        required: [true, 'Book author is required'],
        maxlength: [100, 'Book author cannot exceed 100 characters'],
        trim: true
    },
    genre:{
        type: String,
        required: true,
        trim: true
    },
    year:{
        type: Number,
        trim: true
    },
    pages:{
        type: Number,
        trim: true
    },
    publisher:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Book description is required'],
        maxlength: [1200, 'Book description cannot exceed 1200 characters'],
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

BookSchema.index({ title: 1, createdBy: 1 }, { unique: true });

module.exports = mongoose.model('Book', BookSchema);
   
