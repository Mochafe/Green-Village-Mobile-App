import config from '../config.json';
import FetchInterceptor from './fetchInterceptor';

interface AuthenticationAPI {
  username: string;
  password: string;
}

export const Authentication = async (
  {username, password}: AuthenticationAPI,
  navigation: any,
) => {
  return await (
    await FetchInterceptor(
      `${config.baseUrl}/api/login_check`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
      navigation,
    )
  ).json();
};
