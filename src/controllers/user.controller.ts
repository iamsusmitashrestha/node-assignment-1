import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../utils/prisma.util";
import { getHashedPassword } from "../utils/encryption";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, address, phone, gender } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (user) throw new Error("User Already Exists");

    const newUser = await prismaClient.user.create({
      data: {
        email,
        name,
        address,
        phone,
        gender,
        password: await getHashedPassword(password),
      },
    });

    const {
      id,
      email: userEmail,
      name: userFullname,
      address: userAddress,
      phone: userPhone,
      gender: userGender,
    } = newUser;

    if (!newUser) throw new Error("Error while register");

    return res.status(200).json({
      success: true,
      data: {
        id,
        email: userEmail,
        fullname: userFullname,
        address: userAddress,
        phone: userPhone,
        gender: userGender,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) throw new Error("User Not Found");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new Error("Invalid Password");

    const payload = { email: user.email, password: user.password };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 200000, //TODO change to 1 hour,
    });

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    next(e);
  }
};
