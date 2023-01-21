const express = require('express');
const router = express.Router();
const data = require('../data'); //data.js is outside of current folder
const Book = require('../models/book');//the model object, constructor function is always capitalized, same as String in book.js
/*
1) .get()
2) .post()
3) .put()
4) .delete()
*/

//SEED ROUTE - dummy data, for development purpose only

router.get('/books/seed', (req, res) => {

    //this option will reset database and recreate books
    Book.deleteMany({}, (err, results) => { //empty object will delete everything, unless fill it out with criteria
    //result tells you how many objects are deleted
    Book.create(data, (err, books) => {
        res.redirect('/books');
    });
});
});

//INDEX
router.get("/books", (req, res) => {
    Book.find({}, (error, allBooks) => {//we just named it allBooks here
        res.render("index.ejs", {
            books: allBooks, //original line 35
        });
    });
});

//Routes / Controllers
//NEW
router.get("/books/new", (req, res) => {
    res.render("new.ejs");
});

//DELETE
//rule of thumb, we redirect when data changes
        /*
        1) create
        2) update
        3) delete */
router.delete("/books/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
        res.redirect("/books");  
    })
});

//UPDATE
router.put('/books/:id', (req, res) => {
    if(req.body.completed === "on") {
        req.body.completed = true
    } else{
        req.body.completed = false;
    }
    Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        res.redirect("/books") // <-- new stuff right here
    });
});

//CREATE
router.post("/books", (req, res) => {
if(req.body.completed === "on"){
    req.body.completed = true;
} else{
    req.body.completed = false;
}

Book.create(req.body, (err, createdBook) => { 
    console.log(err);//DEBUG
    res.redirect('/books');
})

});

//EDIT
router.get("/books/:id/edit", (req, res) => {
    //1) look up the doc that needs to be ediited
    Book.findById(req.params.id, (err, foundBook) => {
        //2) render the edit page
        res.render("edit.ejs", {
            book: foundBook,
        })
    })
})

//SHOW
router.get("/books/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
      res.render("show.ejs", {
        book: foundBook,
      })
    })
  })

  module.exports = router;