import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions, StyleSheet } from 'react-native';

const cheerio = require('react-native-cheerio');

var self

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Tartu Weather',
    headerRight: <Button title="Reload" onPress={() => {
      self.reloadData()
    }} />
  };

  constructor(props) {
    super(props);
      self = this
      this.state = {
         temperature: '',
         wind: '',
         measuredTime: '',
         imgSource: 'http://meteo.physic.ut.ee/webcam/uus/pisike.jpg'
      }

    setInterval(() => {
      this.reloadData();
    }, 10000);

    this.reloadData();
  }

   updateText = () => {
      this.setState({myText: 'My Changed Text'})
   }

  reloadData = async ()  => {

    const response = await fetch("http://meteo.physic.ut.ee/en/freshwin.php");
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const temperature = $('.pageMain tbody tr:first-child b').text();
    const wind = $('.pageMain tbody tr:nth-child(4) b').text();

    const measuredTime = $('.pageMain tbody tr:nth-child(7) td:nth-child(2) small i').text();

    var url = 'http://meteo.physic.ut.ee/webcam/uus/pisike.jpg'
    url += '?random=' + new Date().getTime()

    console.log(url);
    

    this.setState({
      temperature: temperature, 
      wind: wind,
      measuredTime: measuredTime,
      imgSource: url});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.weatherDataContainer}>
          <Text>{this.state.temperature}</Text>
          <Text>{this.state.wind}</Text>
        </View>
        <View>
          <Image 
            source={{ uri: this.state.imgSource }}
            style={{width: 340, height: 400, resizeMode: Image.resizeMode.contain}}
             />
        </View>
        <Text>{this.state.measuredTime}</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherDataContainer: {
    flexDirection: 'row'
  }
})
