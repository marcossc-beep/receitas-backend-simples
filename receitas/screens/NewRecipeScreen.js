import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api';

export default function NewRecipeScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    buscarCategorias();
  }, []);

  const buscarCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      setCategorias([]);
    }
  };

  const handleSave = async () => {
    if (!nome || !modoPreparo || !ingredientes || !categoriaId) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma categoria.');
      return;
    }
    try {
      // Para simplificar, usuário_id = 1 (ajuste conforme login real)
      await api.post('/receitas', {
        nome,
        modo_preparo: modoPreparo,
        ingredientes,
        usuario_id: 1,
        categoria_id: categoriaId,
      });
      Alert.alert('Sucesso', 'Receita criada!');
  navigation.navigate('Recipes');
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao criar receita');
    }
  };

  if (categorias.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nova Receita</Text>
        <Text>Crie uma categoria antes de cadastrar receitas.</Text>
  <Button title="Ir para Categorias" onPress={() => navigation.navigate('Categories')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Receita"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Modo de Preparo"
        value={modoPreparo}
        onChangeText={setModoPreparo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
      />
      <Picker
        selectedValue={categoriaId}
        onValueChange={setCategoriaId}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categorias.map(cat => (
          <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
        ))}
      </Picker>
  <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});