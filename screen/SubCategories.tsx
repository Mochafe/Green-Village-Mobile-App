import React from 'react';
import {Text, Button} from 'react-native';

const SubCategories = ({route, navigation}: any): JSX.Element => {
  const {id} = route.params;
  return (
    <>
      <Text>Catégories {id}</Text>
      <Button
        title="Goto Produits"
        onPress={() => navigation.navigate('Products', {category: 'Guitar'})}
      />
    </>
  );
};

export default SubCategories;
