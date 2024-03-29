import Product, { ProductDocument } from "../models/product.model";
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createProduct(input: DocumentDefinition<Omit<ProductDocument,'createdAt' | 'updatedAt'>>) {
    return Product.create(input);
}  

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    return Product.findOne(query, {}, options);
}

export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update:UpdateQuery<ProductDocument>, options: QueryOptions) {
    return Product.findOneAndUpdate(query, update, options);   
}
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return Product.deleteOne(query);
}