import { Router } from 'express';
import multer from 'multer';
import { _, greyImage, messages, putObj, resizeImage, saturateImage } from '../util/index.js';

const router = Router();

router.get('/', (req, res) => res.send('ok'));

router.get('/health', (req, res) => {
    res.send('green');
    console.info('health: green');
});

router.post('/resize', multer().single('imageBuffer'), async (req, res) => {
    try {
        if (!req.file) return res.reply(messages.required('file'));
        if (!_.checkValidImageType(req.file.originalname, req.file.mimetype)) return res.reply(messages.not_allowed('image type not allowed'));
        const data = await resizeImage(req.file.buffer);

        const fileName = await putObj(req.file.originalname, req.file.mimetype, 'images/', data);

        return res.reply(messages.success(), { image: process.env.S3_BUCKET_URL + '/images/' + fileName, fileName });
    } catch (error) {
        console.error(error);
        return res.reply(messages.server_error());
    }
});

router.post('/saturate', multer().single('imageBuffer'), async (req, res) => {
    try {
        if (!req.file) return res.reply(messages.required('file'));
        if (!_.checkValidImageType(req.file.originalname, req.file.mimetype)) return res.reply(messages.not_allowed('image type not allowed'));
        const data = await saturateImage(req.file.buffer);

        const fileName = await putObj(req.file.originalname, req.file.mimetype, 'images/', data);

        return res.reply(messages.success(), { image: process.env.S3_BUCKET_URL + '/images/' + fileName, fileName });
    } catch (error) {
        console.error(error);
        return res.reply(messages.server_error());
    }
});

router.post('/grey', multer().single('imageBuffer'), async (req, res) => {
    try {
        if (!req.file) return res.reply(messages.required('file'));
        if (!_.checkValidImageType(req.file.originalname, req.file.mimetype)) return res.reply(messages.not_allowed('image type not allowed'));
        const data = await greyImage(req.file.buffer);

        const fileName = await putObj(req.file.originalname, req.file.mimetype, 'images/', data);

        return res.reply(messages.success(), { image: process.env.S3_BUCKET_URL + '/images/' + fileName, fileName });
    } catch (error) {
        console.error(error);
        return res.reply(messages.server_error());
    }
});

export default router;
