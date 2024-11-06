import 'react-native-gesture-handler'; 
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoApp from './component/todo';
import CompletedTasks from './component/completedtasks';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const screenOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#FFA500',
  },
  drawerActiveBackgroundColor: '#FFA500',
  drawerActiveTintColor: '#fff',
  drawerInactiveTintColor: '#000',
  headerTitleStyle: {
    color: '#fff',
    fontSize: 20,
  },
  headerTitleAlign: 'center',
  headerLeft: () => (
    <Icon
      name="menu"
      size={30}
      color="#fff"
      style={{ marginLeft: 15 }}
      onPress={navigation.openDrawer}
    />
  ),
});

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Todo App" screenOptions={screenOptions}>
      <Drawer.Screen name="Todo App" component={TodoApp} />
      <Drawer.Screen name="Completed Tasks" component={CompletedTasks} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;
