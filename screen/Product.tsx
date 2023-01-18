import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {GetProductById, ProductApi} from '../fetch/Products';
import {categoriesStyle} from './Categories';
import config from '../config.json';

const productStyle = StyleSheet.create({
  view: {
    width: '100%',
    height: 10,
  },
  image: {
    width: 300,
    height: 100,
  },
});

const Product = ({route}: any): JSX.Element => {
  const {productId, productName} = route.params;
  const [product, setProduct] = useState<ProductApi>();

  useEffect(() => {
    GetProductById(productId).then(response => setProduct(response));
  }, [productId]);

  return (
    <>
      <Text style={categoriesStyle.title}>{productName}</Text>
      <ScrollView style={productStyle.view}>
        {product?.images?.map(image => (
          <Image
            key={image.id}
            style={productStyle.image}
            source={{uri: `${config.baseUrl}${image.path}`}}
          />
        ))}
      </ScrollView>
      <Text>{product ? product.price + ' €' : ''}</Text>
    </>
  );
};

export default Product;
