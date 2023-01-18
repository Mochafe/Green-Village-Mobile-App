import React from 'react';
import {Text, Button} from 'react-native';

const SubCategories = ({navigation}: any): JSX.Element => {
  return (
    <>
      <Text>Catégories</Text>
      <Button
        title="Goto Produits"
        onPress={() => navigation.navigate('Products', {category: 'Guitar'})}
      />
    </>
  );
};

export default SubCategories;
