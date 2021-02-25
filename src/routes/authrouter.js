import express from 'express';
import usercontroller from '../controllers/auth.js';
import Authentication from '../controllers/auth.js';


const router = express.Router();
router.use(express.json());
router.post('/register', Authentication.registration);
router.post('/signin', Authentication.LogIn);
router.post('/forgot', Authentication.forgotPassword);
router.get('/reset/:id/:token', Authentication.resetPassword);

export default router;

