import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RecipesScreen from './screens/RecipesScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import CategoriesScreen from './screens/CategoriesScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Cadastro', drawerItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Drawer.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Alterar Senha', drawerItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Drawer.Screen name="Recipes" component={RecipesScreen} options={{ title: 'Receitas' }} />
        <Drawer.Screen name="NewRecipe" component={NewRecipeScreen} options={{ title: 'Nova Receita' }} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categorias' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
