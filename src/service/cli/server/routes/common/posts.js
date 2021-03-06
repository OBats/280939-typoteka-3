'use strict';

const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../../config/constants`);
const {validate, rules} = require(`../../validation`);

const router = (api) => {
  const postsRouter = new Router();

  postsRouter.get(`/`, (req, res) => {
    const data = api.posts.getAll();
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.get(`/:id`, (req, res) => {
    const {id} = req.params;
    const data = api.posts.findById(id);
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.get(`/categories/:categoryId`, (req, res) => {
    const {categoryId} = req.params;
    const data = api.posts.getPostsByCategoryId(categoryId);
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.post(`/`, rules.post(), validate, (req, res) => {
    const data = api.posts.add(req.body);
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.delete(`/:id`, (req, res) => {
    const {id} = req.params;
    const data = api.posts.delete(id);
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.put(`/:id`, rules.post(), validate, (req, res) => {
    const {id} = req.params;
    const data = api.posts.edit(id, req.body);
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.get(`/posts/my`, (req, res) => {
    const data = api.posts.getMyPosts();
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.get(`/posts/search`, (req, res) => {
    const {query} = req.query;
    let data = {};
    if (query) {
      data = api.posts.searchByTitle(query);
    }
    res.status(HttpCodes.OK).json(data);
  });

  postsRouter.get(`/posts/hot`, (req, res) => {
    const data = api.posts.getHotPosts();
    res.status(HttpCodes.OK).json(data);
  });

  return postsRouter;
};

module.exports = router;
