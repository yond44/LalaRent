import  Express  from "express";
import { register, login, update, delAccount, changePassword, logout, getUser, getUsersList} from "../services/userService.js";
import { authToken } from "../authMiddleware.js/auth.js";
import { refreshToken } from "../services/refreshToken.js";

const userRouter = Express.Router();

userRouter.get('/users', getUsersList)
userRouter.get('/user', authToken, getUser)
userRouter.post ('/registration', register);
userRouter.post ('/login', login);
userRouter.delete('/logout', logout)
userRouter.put ('/user/password', authToken, changePassword)
userRouter.put('/user/:username',authToken, update)
userRouter.delete('/user/:username',authToken, delAccount);

userRouter.get('/token', refreshToken)




export default userRouter