import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Fragment } from 'react';
import { StyleSheet, FlatList, Text, Button, Alert, View, SafeAreaView, Image, Pressable } from 'react-native';

// RN Code
const Item = ({ item }) => {
  return <View style={styles.item}>{item.icon}</View>;
};

export default function App() {
  const AddToDisplayText = (displayText, character) => {
    if (displayText === "0") {
      if (!(character.charAt(0) >= '0' && character.charAt(0) <= '9')) {
        if (character.charAt(0) == '.') {
          setIsDecimal(true);
        }
        return "0" + character;
      } else {
        return character;
      }
    }

    if (character.charAt(0) >= '0' && character.charAt(0) <= '9') {

    }
    if (character.charAt(0) == '.') {
      if (displayText.charAt(displayText.length - 1) < '0' || displayText.charAt(displayText.length - 1) > '9' || isDecimal) {
        return displayText;
      } else {
        setIsDecimal(true);
      }
    }


    return displayText + character;
  }

  const ClearDisplay = () => {
    setDisplayText("0");
    setIsDecimal(false);
  }

  const Calculate = (input) => {
    if(!isNaN(input) && !isNaN(parseFloat(input))){
      return input;
    }

        if(input.includes("×")){
      const symbolIndex = input.indexOf("×");

      let leftNum = input.substring(symbolIndex - 1, symbolIndex); 
      let rightNum = input.substring(symbolIndex + 1, symbolIndex + 2);
      
      for(let i = symbolIndex - 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == -1); i--){
        leftNum = input.charAt(i) + leftNum;
      }

      for(let i = symbolIndex + 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == input.length); i++){
        rightNum += input.charAt(i);
      }

      return Calculate(((input.substring(0, symbolIndex - leftNum.length)).concat((Number(leftNum) * Number(rightNum)).toString())).concat(input.substring(symbolIndex + rightNum.length + 1, input.length)));
    }

    if(input.includes("÷")){
      const symbolIndex = input.indexOf("÷");

      let leftNum = input.substring(symbolIndex - 1, symbolIndex); 
      let rightNum = input.substring(symbolIndex + 1, symbolIndex + 2);
      
      for(let i = symbolIndex - 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == -1); i--){
        leftNum = input.charAt(i) + leftNum;
      }

      for(let i = symbolIndex + 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == input.length); i++){
        rightNum += input.charAt(i);
      }

      return Calculate(((input.substring(0, symbolIndex - leftNum.length)).concat((Number(leftNum) / Number(rightNum)).toString())).concat(input.substring(symbolIndex + rightNum.length + 1, input.length)));
    }

    if(input.includes("+")){
      const symbolIndex = input.indexOf("+");

      let leftNum = input.substring(symbolIndex - 1, symbolIndex); 
      let rightNum = input.substring(symbolIndex + 1, symbolIndex + 2);
      
      for(let i = symbolIndex - 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == -1); i--){
        leftNum = input.charAt(i) + leftNum;
      }

      for(let i = symbolIndex + 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == input.length); i++){
        rightNum += input.charAt(i);
      }

      return Calculate(((input.substring(0, symbolIndex - leftNum.length)).concat((Number(leftNum) + Number(rightNum)).toString())).concat(input.substring(symbolIndex + rightNum.length + 1, input.length)));
    }

    if(input.includes("-")){
      const symbolIndex = input.indexOf("-");

      let leftNum = input.substring(symbolIndex - 1, symbolIndex); 
      let rightNum = input.substring(symbolIndex + 1, symbolIndex + 2);
      
      for(let i = symbolIndex - 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == -1); i--){
        leftNum = input.charAt(i) + leftNum;
      }

      for(let i = symbolIndex + 2; ('0' <= input.charAt(i) && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (i == input.length); i++){
        rightNum += input.charAt(i);
      }

      return Calculate(((input.substring(0, symbolIndex - leftNum.length)).concat((Number(leftNum) * Number(rightNum)).toString())).concat(input.substring(symbolIndex + rightNum.length + 1, input.length)));
    }
  }

  var [displayText, setDisplayText] = useState("0");
  var [isDecimal, setIsDecimal] = useState(false);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "black",
      // alignItems: 'center',
      justifyContent: 'center',
    }}>
      <View style={{
        backgroundColor: "black",
        flex: 1,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginHorizontal: 15,
      }}>

        <Text style={styles.displayText} adjustsFontSizeToFit={true} numberOfLines={1}>
          {displayText}
        </Text>
      </View>

      <View style={{
        backgroundColor: "black",
        flex: 2
      }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Pressable onPress={() => ClearDisplay()} style={styles.cell3} android_ripple={{ color: 'white' }}>
              <Text style={styles.cellText1}>C</Text>
            </Pressable>
            <Pressable onPress={() => console.log("gyatt")} style={styles.cell3} android_ripple={{ color: 'white' }}>
              <Text style={styles.cellText1}>()</Text>
            </Pressable>
            <Pressable onPress={() => console.log("gyatt")} style={styles.cell3} android_ripple={{ color: 'white' }}>
              <Text style={styles.cellText1}>%</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '÷'))} style={styles.cell2} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText1}>÷</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '7'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>7</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '8'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>8</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '9'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>9</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '×'))} style={styles.cell2} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText1}>×</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '4'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>4</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '5'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>5</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '6'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>6</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '-'))} style={styles.cell2} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText1}>-</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '1'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>1</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '2'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>2</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '3'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>3</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '+'))} style={styles.cell2} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText1}>+</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => console.log("gyatt")} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>+/-</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '0'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>0</Text>
            </Pressable>
            <Pressable onPress={() => setDisplayText(AddToDisplayText(displayText, '.'))} style={styles.cell1} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText2}>.</Text>
            </Pressable>
            <Pressable onPress={() => {setDisplayText(Calculate(displayText))}} style={styles.cell2} android_ripple={{ color: 'light grey' }}>
              <Text style={styles.cellText1}>=</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: "white",
    fontSize: 60,
    
  },
  row: {
    flexDirection: 'row',
  },
  cell1: {
    width: 96,
    height: 108,
    margin: 0,
    backgroundColor: "#505050",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell2: {
    width: 96,
    height: 108,
    margin: 0,
    backgroundColor: "#FF9500",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell3: {
    width: 96,
    height: 108,
    margin: 0,
    backgroundColor: "#D4D4D2",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText1: {
    color: 'black',
    fontSize: 25,
  },
  cellText2: {
    color: 'white',
    fontSize: 25,
  },
});
