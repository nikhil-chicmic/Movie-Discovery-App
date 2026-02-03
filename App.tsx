import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesProvider } from "./context/FavoritesContext";

import BottomTabs from "./navigation/BottomTabs";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Details" component={MovieDetailsScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    </FavoritesProvider>
  );
}
