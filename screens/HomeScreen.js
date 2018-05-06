import React, { Component } from 'react';

import { 
  View, 
  Text, 
  Button, 
  Image, 
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';

const cheerio = require('react-native-cheerio');

var self

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Tartu Weather',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#1E4666'
    },
    headerRight: <Button title="Reload" onPress={() => {
      self.reloadData()
    }} />
  };

  constructor(props) {
    super(props);
      self = this

      this.imgUrl = 'http://meteo.physic.ut.ee/webcam/uus/pisike.jpg'

      this.state = {
         temperature: '',
         wind: '',
         measuredTime: '',
         imgSource: this.imgUrl
      }

    setInterval(() => {
      this.reloadData();
    }, 60000);

    this.reloadData();
  }

  reloadData = async () => {

    const response = await fetch("http://meteo.physic.ut.ee/en/freshwin.php");
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const temperature = $('.pageMain tbody tr:first-child b').text();
    const wind = $('.pageMain tbody tr:nth-child(4) b').text();
    const measuredTime = $('.pageMain tbody tr:nth-child(7) td:nth-child(2) small i').text();

    url = this.imgUrl + "?c=" + new Date()

    console.log(url);

    this.setState({
      temperature: temperature,
      wind: wind,
      measuredTime: measuredTime,
      imgSource: url
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.weatherDataContainer}>
          <Text style={ styles.weatherData }>{this.state.temperature}</Text>
          <Text style={ styles.weatherData }>{this.state.wind}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            key={new Date()}
            source={{ uri: this.state.imgSource, headers: {Pragma: 'no-cache' } }}
            style={styles.liveImage} />
        </View>
        <View style={styles.measuredTimeContainer}>
          <Text style={styles.measuredTime}>{this.state.measuredTime}</Text>
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const imageWidth = width * 0.9

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  weatherDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 90
  },
  weatherData: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20
  },
  imageContainer: {
    height: 250
  },
  liveImage: {
    width: imageWidth, 
    height: imageWidth * 0.8,
    resizeMode: Image.resizeMode.contain,
    borderRadius: 3
  },
  measuredTimeContainer: {
    paddingTop: 10
  },
  measuredTime: {
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'italic',
    padding: 20
  }
})
