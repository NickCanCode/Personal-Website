import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

//create the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

//use mongodb
mongoose.connect("mongodb://localhost:27017");

//define blog model
const Blog = mongoose.model('Blog', new mongoose.Schema({
  title: String,
  content: String
}));

//handle form submission
app.use(express.urlencoded({ extended: true }));
app.post('/blog', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Blog({ title, content });
    await newPost.save();
    res.redirect(`/blog/${newPost._id}`);
  } catch {
    res.status(400).send("Error creating blog post D:")
  }
});

//adds EJS
app.set('view engine', 'ejs'); // Sets EJS as template enginge

//middleware (makes it so that I can use the static files)
app.use(express.static(path.join(__dirname, 'public')));


//home page
app.get("/", (req, res) => {
  //defines routes
  res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

//blog page
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

//blog posts
app.get("/blog/:postId", async (req, res) => {
  try {
  const postId = req.params.postId; // this gets the blog postID / name from the URL
  const post = await Blog.findById(postId); // makes the post from the schematic identified by the post id
  if (post) {
    res.render('blog', { title: post.title, content: post.content });
  } else {
    res.status(404).send('Post not found');
  } 
} 
catch (error) {
  res.status(500).send("SERVER ERROR D:");
}
});

//new post page
app.get("/new-post", (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'newpost.html'));
});

//contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

//projects page
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "projects.html"));
});

//listening for port 3000 :D.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
