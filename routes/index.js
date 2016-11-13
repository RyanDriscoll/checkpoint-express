'use strict';

var express = require('express');
var router = express.Router();
const todos = require('../models/todos');

// write your routes here. Feel free to split into multiple files if you like.

router.get('/users', function(req, res, next) {
  let peepList = todos.listPeople();
  res.send(peepList);
});

router.get('/users/:name', function(req, res, next) {
  let name = req.params.name;
  let query = req.query;
  let list = todos.list(name);
  if (!list) {
    res.status(404);
    return next(new Error());
  }
  if (query.status === 'complete') {
    list = todos.list(name).filter(function(taskObj) {
      return taskObj.complete;
    });
  }
  if (query.status === 'active') {
    list = todos.list(name).filter(function(taskObj) {
      return !taskObj.complete;
    });
  }
  res.send(list);
});

router.post('/users/:name', function(req, res, next) {
  let name = req.params.name;
  let content = req.body;
  if (Object.keys(content).length > 1) {
    res.status(400);
    return next(new Error());
  }
  todos.add(name, content);
  res.status(201).send(content);
});

router.put('/users/:name/:index', function(req, res, next) {
  let name = req.params.name;
  let index = req.params.index;
  todos.complete(name, index);
  res.end();
});

router.delete('/users/:name/:index', function(req, res, next) {
  let name = req.params.name;
  let index = req.params.index;
  todos.remove(name, index);
  res.sendStatus(204);
});

router.use(function(err, req, res, next) {
  res.send(err);
});





module.exports = router;