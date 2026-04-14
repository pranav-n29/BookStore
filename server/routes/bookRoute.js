const express=require("express");
const router=express.Router();
const bigPromise=require("../middlewares/bigPromise");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const{ home, createBook, getAllBooks, getSingleBook, updateBook, deleteBook }=require("../controllers/bookController");


router.route("/").get(home);
router.route("/create").post(isLoggedIn, createBook);
router.route("/allbooks").get(isLoggedIn, getAllBooks);
router.route("/book/:id").get(isLoggedIn, getSingleBook);
router.route("/update/:id").put(isLoggedIn, updateBook);
router.route("/delete/:id").delete(isLoggedIn, deleteBook);

module.exports=router;