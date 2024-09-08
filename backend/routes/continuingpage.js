const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글 수정
router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }
      await Post.update({
        content: req.body.content,
      }, {
        where: { id: req.params.id, UserId: req.user.id },
      });
      res.json({ message: '게시글이 수정되었습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

// 게시글 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }
      await Post.destroy({
        where: { id: req.params.id, UserId: req.user.id },
      });
      res.json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
module.exports = router;