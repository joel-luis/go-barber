import { Router } from 'express';
import multer from 'multer';
import ulpoadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/updateuseravatarservice';

const usersRouter = Router();

const upload = multer(ulpoadConfig);

usersRouter.post('/', async (request, response) => {
 
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
     
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar') , async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    
    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
 });

export default usersRouter;