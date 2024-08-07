import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//create the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

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
app.get("/blog/:post", (req, res) => {
  const post = req.params.post; // this gets the blog post name from the URL
  res.render('blog', { post: post, content: 'this is the content' }); // renders blog.ejs with the post name
})

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
