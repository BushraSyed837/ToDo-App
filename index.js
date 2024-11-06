import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';  
import store from './store/store'; 
import { name as appName } from './app.json';


const RegisterStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RegisterStore);
