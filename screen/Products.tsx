import React, {useEffect, useState} from 'react';
import {stylesCategoriesCard, categoriesStyle} from './Categories';
import config from '../config.json';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {GetProductsByCategory, ProductApi} from '../fetch/Products';

const ProductsCard = (props: any) => {
  return (
    <TouchableOpacity
      style={stylesCategoriesCard.card}
      onPress={() =>
        props.navigation.navigate('Product', {
          productId: props.id,
          productName: props.name,
        })
      }>
      <Image
        style={stylesCategoriesCard.thumbnail}
        source={{uri: config.baseUrl + props.image, cache: 'force-cache'}}
        loadingIndicatorSource={{uri: props.image}}
      />
      <Text style={stylesCategoriesCard.categoryTitle}>{props.name}</Text>
      <Text style={stylesCategoriesCard.categoryTitle}>{props.price} €</Text>
    </TouchableOpacity>
  );
};

export const loadingStyle = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Products = ({route, navigation}: any): JSX.Element => {
  const {category, subcategoryName} = route.params;
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    GetProductsByCategory(category, navigation).then(response => {
      setProducts(response);
      setIsLoading(false);
    });
  }, [category]);
  return (
    <>
      <Text style={categoriesStyle.title}>{subcategoryName}</Text>
      {isLoading ? (
        <View style={loadingStyle.container}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        ''
      )}

      <ScrollView contentContainerStyle={categoriesStyle.categoriesList}>
        {products.map(product => (
          <ProductsCard
            key={'products-' + product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images ? product.images[0].path : ''}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Products;
