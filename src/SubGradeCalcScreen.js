import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SubGradeCalcScreen = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      gradeComponentName: "",
      percentage: "",
      scores: [{ id: 1, score: "", maxScore: "" }],
    },
  ]);

  const [cardCounter, setCardCounter] = useState(2);
  const [scoreCounter, setScoreCounter] = useState(2);
  const [outputValue, setOutputValue] = useState(0);

  const calculate = () => {
    let totalScore = 0;
    let totalMaxScore = 0;
    const outputValuePerCard = [];

    for (const card of cards) {
      totalScore = 0;
      totalMaxScore = 0;
      for (const score of card.scores) {
        totalScore += parseFloat(score.score);
        totalMaxScore += parseFloat(score.maxScore);
      }

      let result = totalScore / totalMaxScore;
      result = result * 50 + 50;
      result = result * (parseFloat(card.percentage) / 100);
      outputValuePerCard.push(result);
    }

    let finalResult = 0;
    for (const value of outputValuePerCard) {
      finalResult += value;
    }

    setOutputValue(finalResult);
  };

  const addCard = () => {
    const newCard = {
      id: cardCounter,
      gradeComponentName: "",
      percentage: "",
      scores: [{ id: 1, score: "", maxScore: "" }],
    };
    setCards([...cards, newCard]);
    setCardCounter((prevCounter) => prevCounter + 1);
  };

  const removeCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const addScore = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            scores: [
              ...card.scores,
              { id: scoreCounter, score: "", maxScore: "" },
            ],
          }
        : card
    );
    setCards(updatedCards);
    setScoreCounter((prevCounter) => prevCounter + 1);
  };

  const removeScore = (cardId, scoreId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            scores: card.scores.filter((score) => score.id !== scoreId),
          }
        : card
    );
    setCards(updatedCards);
  };

  const updateCardInfo = (cardId, key, value) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, [key]: value } : card
    );
    setCards(updatedCards);
  };

  const updateScore = (cardId, scoreId, key, value) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            scores: card.scores.map((score) =>
              score.id === scoreId ? { ...score, [key]: value } : score
            ),
          }
        : card
    );
    setCards(updatedCards);
  };

  const renderScore = (cardId, score) => {
    return (
      <View key={score.id} style={styles.scoreContainer}>
        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}>Score</Text>
          <TextInput
            style={styles.scoreInput}
            value={score.score}
            onChangeText={(text) =>
              updateScore(cardId, score.id, "score", text)
            }
          />
        </View>

        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}></Text>
          <Text style={styles.seperator}>/</Text>
        </View>

        <View style={styles.signifierContainer}>
          <Text style={styles.signifierText}>Max Score</Text>
          <TextInput
            style={styles.scoreInput}
            value={score.maxScore}
            onChangeText={(text) =>
              updateScore(cardId, score.id, "maxScore", text)
            }
          />
        </View>
        <View style={styles.signifierText}>
          <TouchableOpacity
            onPress={() => removeScore(cardId, score.id)}
            style={styles.removeScore}
          />
        </View>
      </View>
    );
  };

  const renderCards = () => {
    return cards.map((card) => (
      <View key={card.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <TextInput
            placeholder="grade component name"
            style={styles.titleInput}
            value={card.gradeComponentName}
            onChangeText={(text) =>
              updateCardInfo(card.id, "gradeComponentName", text)
            }
          />
          <TextInput
            placeholder="percentage"
            style={styles.percentageInput}
            value={card.percentage}
            onChangeText={(text) => updateCardInfo(card.id, "percentage", text)}
          />
          <TouchableOpacity
            onPress={() => removeCard(card.id)}
            style={styles.removeCard}
          />
        </View>
        <View style={styles.cardBody}>
          <View style={styles.scoreControl}>
            <TouchableOpacity
              onPress={() => addScore(card.id)}
              style={styles.addScore}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            {card.scores.map((score) => renderScore(card.id, score))}
          </View>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.outputValueText}>{outputValue}</Text>
      <TouchableOpacity style={styles.addCard} onPress={addCard} />
      <TouchableOpacity style={styles.calculate} onPress={calculate} />
      <ScrollView>
        <SafeAreaView>{renderCards()}</SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#2c3e50",
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleInput: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    margin: 15,
  },
  percentageInput: {
    width: 100,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    margin: 15,
  },
  removeCard: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 5,
  },
  addCard: {
    alignSelf: "center",
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: "green",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: {
    flexDirection: "row",
  },
  scoreContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 15,
  },
  scoreInput: {
    flex: 1,
    height: 40,
    width: 60,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  seperator: {
    color: "white",
    fontSize: 30,
    marginHorizontal: 5,
    marginHorizontal: 10,
  },
  signifierText: {
    color: "white",
    marginVertical: 5,
    textAlign: "center",
    fontSize: 12,
  },
  scoreControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  addScore: {
    backgroundColor: "yellow",
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 10,
  },
  removeScore: {
    backgroundColor: "orange",
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  calculate: {
    alignSelf: "center",
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: "green",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  outputValueText: {
    fontSize: 30,
    color: "white",
  },
});

export default SubGradeCalcScreen;
