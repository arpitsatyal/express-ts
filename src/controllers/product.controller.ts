import { Request, Response } from "express";
import { createProductInput, updateProductInput, getProductInput, deleteProductInput } from "../schema/product.schema";
import { createProduct, findProduct, findAndUpdateProduct, deleteProduct } from "../services/product.service";

export async function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;
    const product =  await createProduct({
        ...body,
        user: userId
    })
    res.send(product);
}
export async function updateProductHandler(req: Request<updateProductInput['params']>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const body = req.body;
    
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

    const updatedProduct = await findAndUpdateProduct({ productId }, body, { new: true })
    return res.send(updatedProduct);
}
export async function getProductHandler(req: Request<getProductInput['params']>, res: Response) {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    if (!product) {
        return res.sendStatus(404);
      }
    
      return res.send(product)
}
export async function deleteProductHandler(req: Request<deleteProductInput['params']>, res: Response) {
    const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
}