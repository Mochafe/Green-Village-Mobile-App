import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from './screen/Categories';
import SubCategories from './screen/SubCategories';
import Products from './screen/Products';
import Product from './screen/Product';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            title: 'Catégories',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="SubCategories"
          component={SubCategories}
          options={{
            title: 'Catégories',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Products"
          options={{
            title: 'Produits',
            headerTitleAlign: 'center',
          }}>
          {props => <Products {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Product"
          options={{
            title: 'Produit',
            headerTitleAlign: 'center',
          }}>
          {props => <Product {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
