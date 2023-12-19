import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';


const SubGradeCalcScreen = () => {
  const [cards, setCards] = useState([]);
  const [cardCounter, setcardCounter] = useState(1);

  const addCard = () => {
    const newCard = { id: cardCounter };
    setCards([...cards, newCard]);
    setcardCounter(cardCounter + 1);
  };

  const removeCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <View key={card.id} style={styles.card}>
        <TouchableOpacity onPress={() => removeCard(card.id)} style={styles.removeCard} />
        <TextInput style={styles.percentInput}/>
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
  }, 
  TitleInput: {
    height: 40,
    width: 80, 
    backgroundColor: 'white', 
    paddingHorizontal: 10, 
  }
});

export default SubGradeCalcScreen;
