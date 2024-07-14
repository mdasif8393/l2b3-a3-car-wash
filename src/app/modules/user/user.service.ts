import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';

// sign up user
const createUserIntoDB = async (payload: TUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.create(payload);
  return result;
};

// login user
const loginUser = async (payload: TLoginUser) => {
  // if user not found show not found error
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // password validation
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password do not matched, Enter valid password',
    );
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // create access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accessToken,
    user,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
