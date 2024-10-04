import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function App() {

  // State variables
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  // Calculate functions
  const calcSum = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    setResult((num1 + num2).toString());
    setActiveButton('sum');
  };
  const calcSub = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    setResult((num1 - num2).toString());
    setActiveButton('sub');
  };
  const calcMul = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    setResult((num1 * num2).toString());
    setActiveButton('mul');
  };
  const calcDiv = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    setResult((num1 / num2).toString());
    setActiveButton('div');
  };

   // Button styles based on whether they are pressed or not
  const getButtonStyle = (buttonId) => {
    return activeButton === buttonId ? styles.buttonPressed : styles.button;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>
      <StatusBar style="auto" />

      {/* Number Inputs */}
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number1}
            onChangeText={text => setNumber1(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'} ></TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number2}
            onChangeText={text => setNumber2(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'}></TextInput>
        </View>
      </View>

       {/* Buttons with Dynamic Color Change */}
      <View style={styles.buttonRow}>
        <Pressable
          style={getButtonStyle('sum')}
          onPress={calcSum}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable
          style={getButtonStyle('sub')}
          onPress={calcSub}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable
          style={getButtonStyle('mul')}
          onPress={calcMul}
        >
          <Text style={styles.buttonText}>×</Text>
        </Pressable>
        <Pressable
          style={getButtonStyle('div')}
          onPress={calcDiv}
        >
          <Text style={styles.buttonText}>÷</Text>
        </Pressable>
      </View>
      
      {/* Result Display */}
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder='0'
            value={result}
            style={{ textAlign: 'right' }}
            editable={false}>
          </TextInput>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150
  },
  calculator: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  text: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    padding: 5,
    width: 100,
  },
  textInput: {
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 100,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 220,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#00008b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
