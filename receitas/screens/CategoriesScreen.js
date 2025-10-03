import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../api';


export default function CategoriesScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [categorias, setCategorias] = useState([]);

  const buscarCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      setCategorias([]);
    }
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  const handleAddCategory = async () => {
    if (!nome) {
      Alert.alert('Erro', 'Preencha o nome da categoria.');
      return;
    }
    try {
      await api.post('/categorias', { nome });
      setNome('');
      buscarCategorias();
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao criar categoria');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/categorias/${id}`);
      await buscarCategorias();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível deletar a categoria.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Categoria"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Adicionar Categoria" onPress={handleAddCategory} />
      <FlatList
        data={categorias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoriaRow}>
            <Text style={styles.categoriaItem}>{item.nome}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCategory(item.id)}
            >
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhuma categoria cadastrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  // title removido
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  categoriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  categoriaItem: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});