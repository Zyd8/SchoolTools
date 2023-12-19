import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';


const SubGradeCalcScreen = () => {
  const [cards, setCards] = useState([]);
  const [cardCounter, setcardCounter] = useState(1);

  const addCard = () => {
    const newCard = { id: cardCounter, scores: [] };
    setCards([...cards, newCard]);
    setcardCounter(cardCounter + 1);
  };

  const removeCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const addScore = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? { ...card, scores: [...card.scores, { id: card.scores.length + 1 }] }
        : card
    );
    setCards(updatedCards);
  };

  const renderScore = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    return card?.scores.map((score) => (
      <View key={score.id} style={styles.scoreContainer}>
        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}>Score</Text>
          <TextInput style={styles.scoreInput}/>
        </View>
        
        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}></Text>
          <Text style={styles.seperator}>/</Text>
        </View>
        
        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}>Max Score</Text>
          <TextInput style={styles.scoreInput}/>
        </View>
      </View>
    ));
  };

  const renderCards = () => {
    return cards.map((card) => (
      <View key={card.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <TextInput placeholder="grade component name" style={styles.titleInput}/>
          <TextInput placeholder="percentage" style={styles.percentageInput}/>
          <TouchableOpacity onPress={() => removeCard(card.id)} style={styles.removeCard}/>
        </View>
        <View style={styles.cardBody}>

          <View style={styles.scoreControl}>
              <TouchableOpacity onPress={() => addScore(card.id)} style={styles.addScore} />
              <TouchableOpacity style={styles.removeScore}/>
          </View>

            <View style={{flexDirection: "column"}}>
              {renderScore(card.id)}
            </View>
            
          </View>
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
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#2c3e50',
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    margin: 15,
  },
  percentageInput: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    margin: 15
  },
  removeCard: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  addCard: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flexDirection: "row"
  },
  scoreContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 15
  },
  scoreInput: {
    flex: 1,
    height: 40,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
  seperator: {
    color: 'white',
    fontSize: 30,
    marginHorizontal: 5,
    marginHorizontal: 10,
  },
  signifierText: {
    color: 'white',
    marginVertical: 5,
    textAlign: "center",
    fontSize: 12
  },
  scoreControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  addScore: {
    backgroundColor: "yellow",
    height: 30,
    width: 30,
    margin: 10,
    borderRadius: 10,
  },
  removeScore: {
    backgroundColor: "orange",
    height: 30,
    width: 30,
    margin: 10,
    borderRadius: 10,
  }
});

export default SubGradeCalcScreen;
