const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Story, Post, Hashtag } = require('../models'); // Post 대신 Story를 가져옴
// const { isLoggedIn } = require('./middlewares');

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

        const { nickname, story, title } = req.body;

        // stories 테이블에 데이터 저장
        const newStory = await Story.create({
            nickname,
            content: story, // content에 story 저장
            title
        });

        // 해시태그 처리 (선택사항)
        const hashtags = story.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    });
                })
            );
            await newStory.addHashtags(result.map(r => r[0]));
        }

        res.status(200).json({ message: '스토리가 성공적으로 저장되었습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;