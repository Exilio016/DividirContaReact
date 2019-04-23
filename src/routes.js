import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import AddPerson from './pages/AddPerson';
import AddProduct from './pages/AddProduct';

const Routes = createAppContainer(
  createSwitchNavigator({
    Main,
    AddPerson,
    AddProduct
  })
);

export default Routes;