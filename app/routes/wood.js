import express from 'express';
import * as woodController from '../controllers/wood.js';

const router = express.Router();

router.get('/', woodController.woodList);

export default router;