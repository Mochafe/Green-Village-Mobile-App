import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  CategoriesApi,
  categoriesStyle,
  CategoriesCardParameters,
  stylesCategoriesCard,
} from './Categories';
import {GetCategories} from '../fetch/Category';
import config from '../config.json';
import {loadingStyle} from './Products';

const SubcategoriesCard = (props: CategoriesCardParameters) => {
  return (
    <TouchableOpacity
      style={stylesCategoriesCard.card}
      onPress={() =>
        props.navigation.navigate('Products', {
          category: props.id,
          subcategoryName: props.name,
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

const SubCategories = ({route, navigation}: any): JSX.Element => {
  const {id, parentName} = route.params;
  const [subcategories, setSubcategories] = useState<CategoriesApi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    GetCategories(navigation).then((result: any) => {
      result.forEach((element: CategoriesApi, index: any) => {
        if (!element.parent) {
          delete result[index];
        }
        if (element.parent) {
          if (element.parent.id !== id) {
            delete result[index];
          }
        }
      });
      setSubcategories(result);
      setIsLoading(false);
    });
  }, [id]);
  return (
    <>
      <Text style={categoriesStyle.title}>{parentName}</Text>

      {isLoading ? (
        <View style={loadingStyle.container}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        ''
      )}

      <ScrollView contentContainerStyle={categoriesStyle.categoriesList}>
        {subcategories.map(subcategory => (
          <SubcategoriesCard
            navigation={navigation}
            key={'subcategory-' + subcategory.id}
            id={subcategory.id}
            name={subcategory.name}
            image={subcategory.image?.path}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default SubCategories;
