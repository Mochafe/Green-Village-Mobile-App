import config from '../config.json';
import FetchInterceptor from './fetchInterceptor';

export const GetCategories = async (navigation: any) => {
  return await (
    await FetchInterceptor(
      `${config.baseUrl}/api/categories`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
      navigation,
    )
  ).json();
};
