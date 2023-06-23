import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../utils/prisma.util";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productName, qty, price, remark, description } = req.body;

    const newProduct = await prismaClient.product.create({
      data: {
        productName,
        qty,
        price,
        remark,
        description,
      },
    });

    return res.status(200).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    next(e);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaClient.product.findMany();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
