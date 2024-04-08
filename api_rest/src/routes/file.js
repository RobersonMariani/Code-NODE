import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import fileController from '../controllers/FileController';

const router = new Router();

router.post('/', loginRequired, fileController.store);
export default router;
