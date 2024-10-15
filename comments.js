// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./comments.json');

app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(201).json(newComment);
    }
  });
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex((comment) => comment.id == id);
  if (index > -1) {
    comments.splice(index, 1);
    fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        res.status(200).send('Deleted');
      }
    });
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});