import React from 'react';
import {Text, Button} from 'react-native';

const Products = ({route, navigation}): JSX.Element => {
  const {category} = route.params;
  return (
    <>
      <Text> cat {category}</Text>
      <Button
        title="Goto Produit"
        onPress={() => navigation.navigate('Product')}
      />
    </>
  );
};

export default Products;
