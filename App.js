import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

export default function WeatherApp() {

  const [city, setCity] = useState('');

  const [weatherData, setWeatherData] = useState({
    cidade: 'recife',
    temperatura: '100 º C',
    descricaoCeu: 'Nublado',
    umidade: '83%',
    vento: '3.2Km/h'
  });

  const [sugestoes, setSugestoes] = useState([
    { nome: 'Sao Paulo', key: 1 },
    { nome: 'Rio de janeiro ', key: 2 },
    { nome: 'Recife', key: 3 },
    { nome: 'Rio Branco', key: 4 },
    { nome: 'Maceió', key: 5 },
    { nome: 'Macapá', key: 6 },
    { nome: 'Manaus', key: 7 },
    { nome: 'Salvador', key: 8 },
    { nome: 'Brasília', key: 9 },
    { nome: 'Vitória', key: 10 },
    { nome: 'Goiânia', key: 11 },
    { nome: 'Cuiabá', key: 12 },
    { nome: 'Belém', key: 13 },
    { nome: 'Teresina', key: 14 },
    { nome: 'Natal', key: 15 },
    { nome: 'Palmas', key: 16 },

  ])

  const [containerPrevisao, setcontainerPrevisao] = useState(false);

  const [containerSugestao, setcontainerSugestao] = useState(true);

  const handleSubmitData = async () => {
    try {
      apiKey = '9936fcd42e0f48392a0428c51e2526a4';
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
      var res = await fetch(apiWeatherURL);

    } catch (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    }

    const data = await res.json();
    console.log(data)
    setData(data)
    setSugestoes(false)
    setcontainerPrevisao(true);
  };

  const setData = (data) => {
    let temp = data.main.temp;

    setWeatherData(weatherData => {
      return {
        ...weatherData,
        cidade: data.name,
        temperatura: temp.toFixed(),
        descricaoCeu: data.weather[0].description,
        umidade: data.main.humidity,
        vento: data.wind.speed
      }
    })
  }

  return (
    <LinearGradient colors={['#000712', '#002863']} style={styles.linearGradient}>
      <StatusBar style="auto" />
      <View style={styles.containerSearch}>
        <Text style={styles.title}>Clima Tempo</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.inputSearch}
          placeholder="Digite o nome da cidade"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Button title="Buscar" onPress={handleSubmitData} />
      </View>

      {containerPrevisao && (
        <View style={styles.containerPrevisao} >
          <Text style={styles.nomeCidade} >{weatherData.cidade}</Text>
          <Text style={styles.temperatura}>{weatherData.temperatura} º C</Text>
          <Text style={styles.descricaoCeu}>{weatherData.descricaoCeu}</Text>
          <View style={styles.containerUmidadeVento}>
            <View style={styles.containerUmidade}>
              <Entypo name="drop" size={24} color="white" />
              <Text style={styles.umidade}>{weatherData.umidade} %</Text>
            </View>
            <View style={styles.division}></View>
            <View style={styles.containerVento}>
              <FontAwesome5 name="wind" size={24} color="white" />
              <Text style={styles.vento}>{weatherData.vento} Km/h</Text>
            </View>
          </View>
        </View>
      )}

      {containerSugestao && (
        <View style={styles.containerSugestao}>
          <FlatList
            style={styles.flatListSugestao}
            numColumns={1}
            keyExtractor={(item) => item.key}
            data={sugestoes}
            renderItem={({ item }) => (
              <TouchableOpacity  style={styles.ContainerItemListSugestoes}>
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerSearch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  inputSearch: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(217,217,217,0.3)'

  },
  title: {
    color: '#000',
    marginBottom: 25,
    fontSize: 20,
    color: '#FFF'
  },
  containerPrevisao: {
    flex: 1,
    gap: 55,
    alignItems: 'center'
  },
  nomeCidade: {
    fontSize: 25,
    color: '#FFF'
  },
  temperatura: {
    fontSize: 75,
    color: '#FFF',
    fontWeight: '600'
  },
  descricaoCeu: {
    fontSize: 16,
    color: '#9B9B9B'
  },
  containerUmidadeVento: {
    flex: 1,
    flexDirection: 'row',
    gap: 50
  },
  containerUmidade: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 130,
    gap: 15
  },
  containerVento: {
    flex: 4,
    flexDirection: 'row',
    gap: 15
  },
  umidade: {
    color: '#FFF',
    fontSize: 18,
  },
  vento: {
    color: '#FFF',
    fontSize: 18
  },
  division: {
    width: 1,
    height: 30,
    backgroundColor: '#FFF'
  },
  containerSugestao: {
    flex: 1,
    height: 200,
    width: 300
  },
  ContainerItemListSugestoes: {
    backgroundColor: 'rgba(217,217,217,0.2)',
    width: 300,
    height: 60,
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

