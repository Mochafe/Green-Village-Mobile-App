import config from '../config.json';

export const GetCategories = async () => {
  return await (await fetch(`${config.baseUrl}/api/categories.json`)).json();
};
