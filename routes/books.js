var express = require("express");
var router = express.Router();
let Book = require("../models/book");
let multer = require("multer");
let Comment = require("../models/comment");

/* GET users listing. */
router.get("/new", (req, res, next) => {
 res.render("books/newBookForm");
});

router.post("/new", (req, res) => {
 req.body.categories = req.body.categories.split(",").join(",");
 Book.create(req.body)
  .then((data) => {
   res.redirect("/books/new");
  })
  .catch((err) => {
   console.log(err);
  });
});

router.get("/", (req, res) => {
 Book.find({})
  .then((data) => {
   res.render("books/allBooks", { books: data });
  })
  .catch((err) => {
   console.log(err);
  });
});

router.get("/:id", (req, res) => {
 let id = req.params.id;
 Book.findById(id)
  .populate("comments")
  .then((data) => {
   console.log(data, "dataaaaaaaaaaaaa");
   res.render("books/singleBook", { book: data });
  })
  .catch((err) => {
   console.log(err);
  });
});

router.get("/:id/edit", (req, res) => {
 let id = req.params.id;
 Book.findById(id)
  .then((singleBook) => {
   res.render("books/updateBookForm", { book: singleBook });
  })
  .catch((err) => {
   console.log(err);
  });
});

router.post("/:id", (req, res) => {
 req.body.categories = req.body.categories.split(",").join(",");
 let id = req.params.id;
 Book.findByIdAndUpdate(id, req.body)
  .then((data) => {
   res.redirect(`/books/${id}`);
  })
  .catch((err) => {
   console.log(err);
  });
});

router.get("/:id/delete", (req, res) => {
 let id = req.params.id;
 Book.findByIdAndDelete(id)
  .then((data) => {
   res.redirect("/books");
   console.log("successfully deleted" + id);
  })
  .catch((err) => {
   console.log(err);
  });
});

// Add Comments
router.post("/:id/comment", (req, res) => {
 let id = req.params.id;
 req.body.bookId = req.params.id;
 Comment.create(req.body)
  .then((data) => {
   Book.findByIdAndUpdate(id, { $push: { comments: data._id } })
    .then((updated) => {
     res.redirect("/books/" + id);
    })
    .catch((err) => {
     console.log("inside ");
    });
  })
  .catch((err) => {
   console.log("outside comment create");
  });
});

module.exports = router;
