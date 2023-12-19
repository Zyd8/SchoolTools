import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const SubGradeCalcScreen = () => {
    const [cards, setCards] = useState([]);
  
    const addCard = () => {
      setCards([...cards, {}]); 
    };
  
    const removeCard = (index) => {
      const updatedCards = [...cards];
      updatedCards.splice(index, 1); 
      setCards(updatedCards);
    };
  
    const renderCards = () => {
      return cards.map((_, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => removeCard(index)} style={styles.removeCard} />
        </View>
      ));
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.addCard} onPress={addCard} />
        <ScrollView>
          <SafeAreaView>{renderCards()}</SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    height: 200,
    width: 350,
    backgroundColor: "brown",
    borderRadius: 10,
  },
  addCard: {
    height: 50,
    width: 50,
    backgroundColor: "yellow"
  },
  removeCard: {
    height: 50,
    width: 50,
    backgroundColor: "orange"
  }
});

export default SubGradeCalcScreen;
