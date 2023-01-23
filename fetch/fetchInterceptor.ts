import AsyncStorage from '@react-native-async-storage/async-storage';

const FetchInterceptor = async (url: string, config: any, navigation: any) => {
  try {
    if (!(await AsyncStorage.getItem('token'))) {
      navigation.navigate('Authentification');
    }
    if (!navigation) {
      throw new Error('navigation is not defined');
    }
    if (config.headers) {
      config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
        'token',
      )}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      };
    }

    const fetchRes = await fetch(
      url,
      config
        ? {
            ...config,
          }
        : undefined,
    );

    if (fetchRes.status === 401) {
      AsyncStorage.removeItem('token', error => {
        if (error) {
          throw error;
        }

        navigation.navigate('Authentification');
      });
    }

    return fetchRes;
  } catch (err) {
    console.log(err);
  }
};

export default FetchInterceptor;
