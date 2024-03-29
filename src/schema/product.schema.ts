import {  object, number, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
const payload = {
    body: object({
        title: string({
            required_error: 'title is required'
        }),
        description: string({
            required_error: 'description is required'
        })
        .min(120, 'description should be atleast 120 characters long.'),
        price: number({
            required_error: 'price is required'
        }),
        image: string({
            required_error: 'image is required'
        })
    })
}

const params ={
    params: object({
        productId: string({
            required_error: 'product id is required..'
        })
    })
}

export const createProductSchema = object({
    ...payload
})
export const updateProductSchema = object({
    ...payload, ...params
})
export const getProductSchema = object({
    ...params
})
export const deleteProductSchema = object({
    ...params
})

export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>