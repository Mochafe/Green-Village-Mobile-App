import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import config from '../config.json';

interface CategoriesCardParameters {
  navigation: any;
  id: number;
  name: string;
  image: string;
}

interface ImageApi {
    
}

interface CategoriesApi {
    id: number;
    name: string;
    image?: 
}

const stylesCategoriesCard = StyleSheet.create({
  card: {
    width: '90%',
    height: 200,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'column',
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
    width: 'auto',
    height: '80%',
  },
});

const CategoriesCard = (props: CategoriesCardParameters) => {
  return (
    <TouchableOpacity
      style={stylesCategoriesCard.card}
      onPress={() =>
        props.navigation.navigate('SubCategories', {id: props.id})
      }>
      <Image
        style={stylesCategoriesCard.thumbnail}
        source={{uri: props.image, cache: 'force-cache'}}
        loadingIndicatorSource={{uri: props.image}}
      />
      <Text style={stylesCategoriesCard.categoryTitle}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const Categories = ({navigation}: any): JSX.Element => {
    const categories = useState([])
    useEffect(() => {
        fetch(`${config.baseUrl}/api/categories.json`)
            .then(response => {
                response.json()
                    .then(json)
            })
    }, []);
  return (
    <>
      <Text style={categoriesStyle.title}>Liste des catégories</Text>

      <ScrollView contentContainerStyle={categoriesStyle.categoriesList}>
        <CategoriesCard
          navigation={navigation}
          id={1}
          name={'Test'}
          image="https://picsum.photos/200/300"
        />
      </ScrollView>
    </>
  );
};

const categoriesStyle = StyleSheet.create({
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
