import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
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
  const [outputGrade, setOutputGrade] = useState("");
  const [errorOutput, setErrorOutput] = useState("");
  const [isOutputVisible, setisOutputVisible] = useState(false);
  const [isErrorOutputVisible, setErrorOutputVisible] = useState(false);

  const getGradeEquivalent = () => {
    let equivalentGrade;
    if (outputGrade >= 98 && outputGrade <= 100) {
      equivalentGrade = "1.00";
    } else if (outputGrade >= 95 && outputGrade <= 97) {
      equivalentGrade = "1.25";
    } else if (outputGrade >= 92 && outputGrade <= 94) {
      equivalentGrade = "1.50";
    } else if (outputGrade >= 89 && outputGrade <= 91) {
      equivalentGrade = "1.75";
    } else if (outputGrade >= 86 && outputGrade <= 88) {
      equivalentGrade = "2.00";
    } else if (outputGrade >= 83 && outputGrade <= 85) {
      equivalentGrade = "2.25";
    } else if (outputGrade >= 80 && outputGrade <= 82) {
      equivalentGrade = "2.50";
    } else if (outputGrade >= 77 && outputGrade <= 79) {
      equivalentGrade = "2.75";
    } else if (outputGrade >= 75 && outputGrade <= 76) {
      equivalentGrade = "3.00";
    } else {
      equivalentGrade = "4.00 or 5.00";
    }
    return equivalentGrade;
  };

  const toggleErrorOutputModal = () => {
    setErrorOutputVisible(!isErrorOutputVisible);
  };

  const toggleOutputModal = () => {
    setisOutputVisible(!isOutputVisible);
  };

  const calculate = () => {
    let totalScore = 0;
    let totalMaxScore = 0;
    const outputGradePerCard = [];

    for (const card of cards) {
      const parsedPercentage = parseFloat(card.percentage);
      if (isNaN(parsedPercentage)) {
        setErrorOutput(
          "Invalid percentages: must be numeric and must not be empty"
        );
        toggleErrorOutputModal();
        throw new Error(
          "Invalid percentages: must be numeric and must not be empty"
        );
      }

      let totalPercentage = 0;
      for (const card of cards) {
        totalPercentage += parseFloat(card.percentage);
      }
      if (totalPercentage != 100) {
        setErrorOutput("Invalid percentages: must add up to 100");
        toggleErrorOutputModal();
        throw new Error("Invalid percentages: must add up to 100");
      }

      totalScore = 0;
      totalMaxScore = 0;
      for (const score of card.scores) {
        const parsedScore = parseFloat(score.score);
        const parsedMaxScore = parseFloat(score.maxScore);

        if (isNaN(parsedScore)) {
          setErrorOutput(
            "Invalid Scores: must be numeric and must not be empty"
          );
          toggleErrorOutputModal();
          throw new Error(
            "Invalid Scores: must be numeric and must not be empty"
          );
        }

        if (isNaN(parsedMaxScore)) {
          setErrorOutput(
            "Invalid Max Scores: must be numeric and must not be empty"
          );
          toggleErrorOutputModal();
          throw new Error(
            "Invalid Max Scores: must be numeric and must not be empty"
          );
        }

        totalScore += parsedScore;
        totalMaxScore += parsedMaxScore;
      }

      let result =
        ((totalScore / totalMaxScore) * 50 + 50) * (parsedPercentage / 100);
      outputGradePerCard.push(result);
    }

    let finalResult = 0;
    for (const value of outputGradePerCard) {
      finalResult += value;
    }

    setOutputGrade(finalResult);
    toggleOutputModal();
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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              updateScore(cardId, score.id, "score", numericValue);
            }}
            keyboardType="numeric"
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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              updateScore(cardId, score.id, "maxScore", numericValue);
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.signifierText}>
          <TouchableOpacity
            onPress={() => removeScore(cardId, score.id)}
            style={styles.removeScore}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('.././assets/minus.png')} 
            />
          </TouchableOpacity>
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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              updateCardInfo(card.id, "percentage", numericValue);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.percentSignifier}>%</Text>
          <TouchableOpacity
            onPress={() => removeCard(card.id)}
            style={styles.removeCard}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('.././assets/x.png')} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.scoreControl}>
            <TouchableOpacity
              onPress={() => addScore(card.id)}
              style={styles.addScore}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require('.././assets/plus.png')} 
              />
            </TouchableOpacity>
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
      <View style={styles.cardControl}>
        <TouchableOpacity style={styles.addCard} onPress={addCard}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('.././assets/plus.png')} 
          />
        </TouchableOpacity>
        <Text style={styles.outputGradeText}>{outputGrade}</Text>
        <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('.././assets/check.png')} 
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>{renderCards()}</SafeAreaView>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOutputVisible}
        onRequestClose={toggleOutputModal}
      >
        <TouchableWithoutFeedback onPress={toggleOutputModal}>
          <View style={styles.outputModalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.outputModalContent}>
                <Text style={styles.modalHeaderText}>Calculated Grade: </Text>
                <Text style={styles.modalContentText}>{outputGrade}</Text>

                <Text style={styles.modalHeaderText}>Equivalent Grade: </Text>
                <Text style={styles.modalContentText}>{getGradeEquivalent()}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isErrorOutputVisible}
        onRequestClose={toggleErrorOutputModal}
      >
        <TouchableWithoutFeedback onPress={toggleErrorOutputModal}>
          <View style={styles.errorOutputModalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.errorOutputModalContent}>
                <Text style={styles.modalHeaderText}>Error Message Says: </Text>
                <Text style={styles.modalContentText}>{errorOutput}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", 
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#262626", 
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#383838", 
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    margin: 15,
    color: "#d9d9d9",
  },
  percentageInput: {
    width: 100,
    height: 50,
    backgroundColor: "#383838", 
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 15,
    color: "#d9d9d9",
    },
  percentSignifier: {
    fontSize: 26,
    color: "#d9d9d9", 
    textAlignVertical: "center",
    marginBottom: 15,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 5
  },
  removeCard: {
    width: 30,
    height: 30,
    backgroundColor: "#e74c3c", 
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  addCard: {
    alignSelf: "center",
    marginVertical: 10,
    width: 80,
    height: 50,
    backgroundColor: "#27ae60", 
    borderRadius: 10,
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
    backgroundColor: "#383838", 
    borderRadius: 5,
    textAlign: "center",
    color: "#d9d9d9",
  },
  seperator: {
    color: "#d9d9d9", 
    fontSize: 30,
    marginHorizontal: 5,
    marginHorizontal: 10,
  },
  signifierText: {
    color: "#d9d9d9", 
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
    backgroundColor: "#f39c12", 
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  removeScore: {
    backgroundColor: "#e67e22",
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  calculateButton: {
    alignSelf: "center",
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: "#3498db", 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  outputGradeText: {
    marginVertical: 10,
    backgroundColor: "#383838", 
    height: 40,
    width: 160,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
    color: "#d9d9d9",
  },
  cardControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  outputModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  outputModalContent: {
    width: "80%",
    backgroundColor: "#262626",
    padding: 20,
    borderRadius: 10,
  },
  errorOutputModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorOutputModalContent: {
    width: "80%",
    backgroundColor: "#262626",
    padding: 20,
    borderRadius: 10,
    color: "#d9d9d9", 
  },
  modalHeaderText: {
    color: "#d9d9d9", 
    fontSize: 22,
    backgroundColor: "#333333", 
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    margin: 5,
  },
  modalContentText: {
    color: "#d9d9d9", 
    fontSize: 14,
    backgroundColor: "#333333", 
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    margin: 5,
  },
});

export default SubGradeCalcScreen;
