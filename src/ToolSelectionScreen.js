import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ToolSelectionScreen = () => {

    const navigation = useNavigation();

    const handleToolButtonPress = (id) => {
        switch (id) {
            case 1:
            navigation.navigate("SubGradeCalcScreen")
            break;
            default:
            console.log("Nothing selected")
            break;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => handleToolButtonPress(1)} style={styles.button}>
                <Text style={styles.buttonText}>Subject Grade Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToolButtonPress(2)} style={styles.button}>
                <Text style={styles.buttonText}>Dummy</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    height: 80,
    width: 200,
    backgroundColor: "brown",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 20
  },
  buttonText: {
    color: "white"
  },

});


export default ToolSelectionScreen;