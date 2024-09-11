const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, cb) {
          cb(null, 'uploads/');
      },
      filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const upload2 = multer();
router.post('/', upload2.none(), async (req, res, next) => {
  try {
      console.log('Received data from frontend:', req.body);

      const { nickname, story} = req.body

      const post = await Post.create({
          nickname,
          content: story,
          title
      });
      const hashtags = req.body.story.match(/#[^\s#]*/g);
      if (hashtags) {
          const result = await Promise.all(
              hashtags.map(tag => {
                  return Hashtag.findOrCreate({
                      where: { title: tag.slice(1).toLowerCase() },
                  })
              }),
          );
          await post.addHashtags(result.map(r => r[0]));
      }
      res.status(200).json({ message: '데이터가 성공적으로 저장되었습니다.' });
  } catch (error) {
      console.error(error);
      next(error);
  }
});

module.exports = router;



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