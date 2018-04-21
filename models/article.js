
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const articleSchema = new Schema({
  title: {type: String, require: true},
  image: {type: String, require: true},
  date: { type: Date, default: Date.now },
  url: {type: String, require: true},
  articleId: {type: String, require: true},
});

const Article = mongoose.model("Article", articleSchema); 


module.exports = Article;