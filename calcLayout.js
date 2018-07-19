
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      screenText: "",
      resultText: "",
    }

  }

  evaluateResult() {
    try {
      let res = eval(this.state.screenText);
      this.setState({
        resultText : res,
      });
    } catch (error) {
      alert('Invalid Input');  
    }
    
  }

  buttonLongPressed(text) {

    this.setState({
      screenText : '',
      resultText : '',
    });

  }

  buttonPressed(text) {

    if(text == '=') {
      this.evaluateResult();
      return;
    }
    if(text == 'DEL') {
      this.setState({
        screenText : this.state.screenText.substring(0, this.state.screenText.length - 1),
      });
      return;
    }

    this.setState({
      screenText : this.state.screenText + text,
    });


  }

  getKeyPadRow() {
    let rows = [];
    let nums = [ [7,8,9], [4,5,6], [1,2,3], ['.', 0, '='] ];
    for(let i=0; i<4; i++) {
      let row = [];
      for(let j=0; j<3; j++) {
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.keyPadBtn}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
        rows.push(
          <View key={i} style={styles.row}>
            {row}
          </View>
        );
    }
    return rows;
  }

  getOperationRow() {
    let operationOP = ['+', '-', '*', '/'];
    let operationRow = [];
    for(let j=0; j<operationOP.length; j++) {
      operationRow.push(
        <TouchableOpacity key={operationOP[j]} onPress={() => this.buttonPressed(operationOP[j])}>
          <Text style={styles.keyPadBtn}>{operationOP[j]}</Text>
        </TouchableOpacity>
      );
    }
    return operationRow;
  }

  render() {

    

    return (
        <View style={styles.container}>
            <View style={styles.screen}>
              <Text style={styles.screenText}>{this.state.screenText}</Text>
            </View>
            <View style={styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
            </View>
            <View style={styles.buttons}>
                <View style={styles.numbers}>
                  {this.getKeyPadRow()}
                </View>

                <View style={styles.operations}>
                  <View style={styles.operationRow}>
                    <TouchableWithoutFeedback key={'DEL'}
                      onPress={() => this.buttonPressed('DEL')}
                      onLongPress = {() => this.buttonLongPressed('DEL')}
                    >
                      <View>
                        <Text style={styles.keyPadBtn}>DEL</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    {this.getOperationRow()}
                  </View>
                </View>
            </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent:'center',
    alignItems : 'flex-end',
  },
  screenText: {
    color: 'black',
    fontSize: 34,
  },
  result: {
    flex: 1,
    backgroundColor: '#E5ECFF',
    justifyContent:'center',
    alignItems : 'flex-end',
  },
  resultText : {
    color: 'black',
    fontSize: 24,
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  keyPadBtn :{
    fontSize: 24,
    color:'white',
    padding:30,
  },
  // keyPadBtnStyle :{
  //   justifyContent:'center',
  //   alignItems : 'stretch',
  //   alignSelf: 'stretch',
  // },
  numbers:{
    flex: 3,
    
    backgroundColor: '#434343',
  },
  row: {
    flex:1,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems: 'center',
  },
  operationRow: {
    flex:1,
    justifyContent : 'space-around',
    alignItems: 'center',
  },
  
  operations:{
    flex: 1,
    backgroundColor: '#636363',
  }
  
});
