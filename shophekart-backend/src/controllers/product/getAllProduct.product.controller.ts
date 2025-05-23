/* eslint-disable no-console */
// controllers/getAllProducts.controller.ts

import { Request, Response } from "express";
import { asyncHandler, httpResponse } from "../../utils";
import getAllProducts from "../../services/product/getAllProducts.service";

const getAllProductsController = asyncHandler(async (
  req: Request,
  res: Response,
) => {
    console.log(111);
  const products = await getAllProducts();
  httpResponse(req, res, 200, "Products fetched successfully", products);
});

export default getAllProductsController;
