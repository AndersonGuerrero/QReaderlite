import {createStackNavigator, createAppContainer} from 'react-navigation';
import ScanScreen from './../components/ScanScreen';
import HomeScreen from './../components/HomeScreen';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    ScanScreen: {screen: ScanScreen},
    navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Profile'`,
    }),
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

const App = createAppContainer(MainNavigator);

export default App;
