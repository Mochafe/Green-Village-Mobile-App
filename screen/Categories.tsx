import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GetCategories} from '../fetch/Category';
import config from '../config.json';
import {loadingStyle} from './Products';

export interface CategoriesCardParameters {
  navigation: any;
  id: number;
  name: string;
  image: string;
}

export interface ImageApi {
  id: number;
  path: string;
  name: string;
}

export interface CategoriesApi {
  id: number;
  name: string;
  image?: ImageApi;
  parent?: CategoriesApi;
}

export const stylesCategoriesCard = StyleSheet.create({
  card: {
    width: '90%',
    height: 200,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'column',
    marginVertical: 15,
    padding: 10,
  },
  categoryTitle: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  thumbnail: {
    flex: 0.7,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
});

const CategoriesCard = (props: CategoriesCardParameters) => {
  return (
    <TouchableOpacity
      style={stylesCategoriesCard.card}
      onPress={() =>
        props.navigation.navigate('SubCategories', {
          id: props.id,
          parentName: props.name,
        })
      }>
      <Image
        style={stylesCategoriesCard.thumbnail}
        source={{uri: config.baseUrl + props.image, cache: 'force-cache'}}
        loadingIndicatorSource={{uri: props.image}}
      />
      <Text style={stylesCategoriesCard.categoryTitle}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export const Categories = ({navigation}: any): JSX.Element => {
  const [categories, setCategories] = useState<CategoriesApi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    GetCategories(navigation).then((result: any) => {
      result.forEach((element: any, index: any) => {
        if (element.parent || element.id === 1) {
          delete result[index];
        }
      });
      setCategories(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <Text style={categoriesStyle.title}>Liste des catégories</Text>

      {isLoading ? (
        <View style={loadingStyle.container}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        ''
      )}

      <ScrollView contentContainerStyle={categoriesStyle.categoriesList}>
        {categories.map(value => (
          <CategoriesCard
            key={'product-' + value.id}
            navigation={navigation}
            id={value.id}
            name={value.name}
            image={value.image?.path}
          />
        ))}
      </ScrollView>
    </>
  );
};

export const categoriesStyle = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoriesList: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});
export default Categories;
