import {CategoriesApi, ImageApi} from '../screen/Categories';
import config from '../config.json';

export interface ProductApi {
  id: number;
  reference: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: CategoriesApi;
  content: any[];
  images?: ImageApi[];
}

export const GetProductsByCategory = async (
  categoryId: number,
): Promise<ProductApi[]> => {
  return await (
    await fetch(`${config.baseUrl}/api/products?category=${categoryId}`, {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
};

export const GetProductById = async (
  productId: number,
): Promise<ProductApi> => {
  const product = await (
    await fetch(`${config.baseUrl}/api/products/${productId}`, {
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  console.log(product);
  return product;
};
