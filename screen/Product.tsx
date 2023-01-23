import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {GetProductById, ProductApi} from '../fetch/Products';
import {categoriesStyle} from './Categories';
import config from '../config.json';
import Markdown from 'react-native-markdown-display';
import {loadingStyle} from './Products';

const productStyle = StyleSheet.create({
  view: {
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginHorizontal: 15,
  },
  reference: {
    textAlign: 'center',
    fontSize: 8,
    textTransform: 'uppercase',
  },
  price: {
    textAlign: 'center',
    marginTop: 32,
    fontWeight: 'bold',
    fontSize: 32,
  },
  description: {
    textAlign: 'center',
    marginTop: 32,
    marginHorizontal: 20,
  },
  content: {
    marginTop: 32,
    marginBottom: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '95%',
    paddingVertical: 16,
    borderWidth: 0.2,
  },
  item: {
    flex: 0.5,
    textAlign: 'center',
  },
  contentTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 16,
  },
});

const Content = (props: any) => {
  if (!props.content) {
    return <></>;
  }
  const keys = Object.keys(props.content);

  return (
    <View style={productStyle.content}>
      <Text style={productStyle.contentTitle}>Contenu</Text>
      {keys.map(key => (
        <View style={productStyle.row}>
          <Text style={productStyle.item}>{key}:</Text>
          <Text style={productStyle.item}>{props.content[key]}</Text>
        </View>
      ))}
    </View>
  );
};

const Product = ({route, navigation}: any): JSX.Element => {
  const {productId, productName} = route.params;
  const [product, setProduct] = useState<ProductApi>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    GetProductById(productId, navigation).then(response => {
      setProduct(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={loadingStyle.container}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <Text style={categoriesStyle.title}>{productName}</Text>
          <View style={productStyle.view}>
            <ScrollView horizontal>
              {product?.images?.map(image => (
                <Image
                  key={image.id}
                  style={productStyle.image}
                  source={{uri: `${config.baseUrl}${image.path}`}}
                />
              ))}
            </ScrollView>
          </View>
          <Text style={productStyle.reference}>Réf: {product?.reference}</Text>
          <Text style={productStyle.price}>{product?.price} €</Text>
          <View style={productStyle.description}>
            <Markdown>{product?.description}</Markdown>
          </View>
          <Content content={product?.content} />
        </>
      )}
    </ScrollView>
  );
};

export default Product;
