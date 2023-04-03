import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default function WeatherApp() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState();

  const  handleSubmitData = async () => {
    apiKey = '9936fcd42e0f48392a0428c51e2526a4';
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    if (res.status !== 200) {
        return setError();
    }
    const data = await res.json();
    return console.log(data);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#011A3F', '#3E67A4']} style={styles.linearGradient}>
        <StatusBar style="auto" />

        <Text style={styles.title}>weather-forecast</Text>
        <View style={styles.containerSearch}>
          <StatusBar style="auto" />
          <TextInput
            style={styles.inputSearch}
            placeholder="Digite o nome da cidade"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <Button title="Buscar" onPress={handleSubmitData} />

        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSearch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputSearch: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20

  },
  title: {
    color: '#000'
  }
});

