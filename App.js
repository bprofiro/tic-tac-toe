import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import tictactoe from './src/tictactoe';

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props){
    super(props);

    tictactoe.start();

    this.state = {
      board: tictactoe.board,
      gameOver: tictactoe.gameover,
      velha: tictactoe.velha
    }
  }

  makePlay(index) {
    tictactoe.make_play(index);

    this.setState({
      board: tictactoe.board,
      gameOver: tictactoe.gameover,
      velha: tictactoe.velha
    });
  }

  resetar() {
    if(this.state.gameOver === true || this.state.velha === true) {
      tictactoe.start();
    }
  }

  isGameOver() {
    if(this.state.gameOver === true) {
      return (
        <View style={styles.content}>
          <Text style={styles.congrats}>
            Parabéns, você venceu!!
          </Text>
          <TouchableOpacity onPress={this.resetar()} style={styles.button}>
            <Text style={{ color: '#F5F5F5' }}>Resetar</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  isVelha() {
    if(this.state.velha === true) {
      return (
        <View style={styles.content}>
          <Text style={styles.congrats}>
            Deu velha..
          </Text>
          <TouchableOpacity onPress={this.resetar()} style={styles.button}>
            <Text style={{ color: '#F5F5F5' }}>Resetar</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text style={styles.title}>
          Jogo da velha
        </Text>

        <Text style={styles.description}>
          Desafie os seus amigos e mostre quem é o melhor!
        </Text>

        <View style={styles.game}>
          {this.state.board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.piece}
              onPress={() => {this.makePlay(index)}}
            >
              <Text style={styles.value}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {this.isGameOver()}
        {this.isVelha()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24135D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  piece: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#332267',
    justifyContent: 'center',
    alignItems: 'center',
    
    borderWidth: 3,
    borderColor: '#6648C4',
    borderRadius: 15,
  },
  value: {
    color: 'red',
    fontSize: 80
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    color: '#F5F5F5',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  congrats: {
    marginTop: 30,
    fontSize: 20,
    color: '#DEDBEC',
    marginBottom: 50,
    textAlign: 'center'
  },
  button: {
    height: 40,
    width: 186,
    borderWidth: 2,
    borderColor: '#45E2FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  description: {
    color: '#DEDBEC',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  }
});
