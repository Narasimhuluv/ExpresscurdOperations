let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema(
 {
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: { type: Number, required: true },
  publication: { type: String, required: true },
  cover_image: { type: String, required: true },
  categories: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
 },
 { timestamps: true }
);

let Book = mongoose.model("Book", bookSchema);
module.exports = Book;
