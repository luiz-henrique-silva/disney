import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';

// Importa a imagem PNG
import backgroundImg from './assets/estrelas.webp';

// Função para fazer a requisição dos dados
const request = async (callback) => {
  try {
    const response = await fetch('https://swapi.dev/api/starships/');
    const parsed = await response.json();
    callback(parsed.results);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export default function App() {
  const [Registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  return (
    <ImageBackground 
      source={backgroundImg} 
      style={styles.container}
    >
      <Text style={styles.header}>Usando API do Star Wars</Text>
      <FlatList
        data={Registros}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text>nave: {item.name}{'\n'}</Text>
              <Text>Modelo: {item.model}{'\n'}</Text>
              <Text>Usando: {item.manufacturer}</Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  itemContainer: {
    width: 200,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
