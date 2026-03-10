const fs = require("fs");
const path = require("path");

const postFile = path.join(__dirname, "..", "..", "Data", "post.json");
const userFile = path.join(__dirname, "..", "..", "Data", "login.json");

function getPosts() {
  if (!fs.existsSync(postFile)) return [];
  return JSON.parse(fs.readFileSync(postFile));
}

function savePosts(posts) {
  fs.writeFileSync(postFile, JSON.stringify(posts, null, 2));
}

function getUsers() {
  if (!fs.existsSync(userFile)) return [];
  return JSON.parse(fs.readFileSync(userFile));
}

function isValidUser(email) {
  const users = getUsers();
  return users.some((u) => u.email === email);
}

function getAllPosts(req, res) {
  res.send(getPosts());
}

function getPostById(req, res) {
  const id = Number(req.params.id);
  const post = getPosts().find((p) => p.id === id);
  if (!post) return res.status(404).send({ message: "Post not found" });
  res.send(post);
}

function createPost(req, res) {
  const { title, description, image, author } = req.body;
  if (!isValidUser(author))
    return res.status(401).send({ message: "Invalid user" });

  const posts = getPosts();
  const newPost = {
    id: Date.now(),
    title,
    description,
    image,
    author,
    createdAt: new Date(),
  };
  posts.push(newPost);
  savePosts(posts);
  res.send({ message: "Post created successfully", post: newPost });
}

function updatePost(req, res) {
  const id = Number(req.params.id);
  const { title, description, image, author } = req.body;
  if (!isValidUser(author))
    return res.status(401).send({ message: "Invalid user" });

  const posts = getPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).send({ message: "Post not found" });
  if (post.author !== author)
    return res.status(403).send({ message: "You cannot update this post" });

  post.title = title || post.title;
  post.description = description || post.description;
  post.image = image || post.image;

  savePosts(posts);
  res.send({ message: "Post updated successfully", post });
}

function deletePost(req, res) {
  const id = Number(req.params.id);
  const { author } = req.body;
  if (!isValidUser(author))
    return res.status(401).send({ message: "Invalid user" });

  let posts = getPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).send({ message: "Post not found" });
  if (post.author !== author)
    return res.status(403).send({ message: "You cannot delete this post" });

  posts = posts.filter((p) => p.id !== id);
  savePosts(posts);
  res.send({ message: "Post deleted successfully" });
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
