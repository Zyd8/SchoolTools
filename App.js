import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SubGradeCalcScreen from "./src/SubGradeCalcScreen";
import SelectGradeCalcScreen from "./src/SelectGradeCalcScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Subject Grade Calculator"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#333333", 
        },
        headerTintColor: "#d9d9d9", 
      }}
    >
      <Stack.Screen
        name="ToolSelectionScreen"
        component={SelectGradeCalcScreen}
      />
      <Stack.Screen
        name="Subject Grade Calculator"
        component={SubGradeCalcScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}