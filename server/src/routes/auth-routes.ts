import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: {username},
  });

  if (!user){
    return res.status(401).json({message: 'Login Failed'});
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if(!passwordValid){
    return res.status(401).json({message: 'Login Failed'});
  }
  
  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
  return res.json({token});
};

export const createAccount = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try{
    await User.create({username, password});
    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    return res.json({token});

  } catch(err:any){
    return res.status(400).json({message: err.message})
  }
};

export const findUser = async (req: Request, res: Response) => {
  const { username } = req.body

  const user = await User.findOne({
    where: {username},
  });
  return res.json(user?.dataValues.id);
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

router.post('/createUser', createAccount);

router.post('/findUser', findUser)
export default router;
