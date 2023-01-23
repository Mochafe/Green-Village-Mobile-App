import {CategoriesApi, ImageApi} from '../screen/Categories';
import config from '../config.json';
import FetchInterceptor from './fetchInterceptor';

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
  navigation: any,
): Promise<ProductApi[]> => {
  return await (
    await FetchInterceptor(
      `${config.baseUrl}/api/products?category=${categoryId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
      navigation,
    )
  ).json();
};

export const GetProductById = async (
  productId: number,
  navigation: any,
): Promise<ProductApi> => {
  const product = await (
    await FetchInterceptor(
      `${config.baseUrl}/api/products/${productId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
      navigation,
    )
  ).json();
  console.log(product);
  return product;
};
