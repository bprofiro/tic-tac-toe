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
      gameOver: tictactoe.gameover
    }
  }

  makePlay(index) {
    tictactoe.make_play(index);

    this.setState({
      board: tictactoe.board,
      gameOver: tictactoe.gameover
    });
  }

  resetar() {
    if(this.state.gameOver === true) {
      tictactoe.start();
    }
  }

  isGameOver() {
    if(this.state.gameOver === true) {
      return (
        <View style={styles.content}>
          <Text style={styles.congrats}>
            Parabéns, você venceu!! Receba seu beijinho de prêmio!
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
          Jogo da velha não:
          Jogo dos nenês!
        </Text>

        <Text style={styles.description}>
          Um jogo pra mostrar que até no jogo da velha eu ganho de você
        </Text>

        <View style={styles.game}>
          {this.state.board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.piece}
              onPress={() => {this.makePlay(index)}}
            >
              <Image style={styles.pieceImage} source={value} />
            </TouchableOpacity>
          ))}
        </View>
        {this.isGameOver()}
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
  pieceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
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