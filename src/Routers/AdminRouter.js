import express from 'express'
import { getAdminbyId, getAllAdmin, loginAdmin, saveAdmin } from '../Controllers/AdminController.js';
const AdminRouter= express.Router();

AdminRouter.post('/admin', saveAdmin);
AdminRouter.get('/admin/:id', getAdminbyId);
AdminRouter.get('/admin', getAllAdmin);
AdminRouter.post('/admin/login', loginAdmin);
export default AdminRouter;