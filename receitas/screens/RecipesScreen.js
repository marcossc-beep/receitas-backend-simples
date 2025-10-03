
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import api from '../api';

export default function RecipesScreen({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const buscarReceitas = useCallback(async () => {
    try {
      const res = await api.get('/receitas');
      setReceitas(res.data);
    } catch (err) {
      //
    }
  }, []);

  const buscarCategorias = useCallback(async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      //
    }
  }, []);

  useEffect(() => {
    buscarReceitas();
    buscarCategorias();
    const unsubscribe = navigation.addListener('focus', () => {
      buscarReceitas();
      buscarCategorias();
    });
    return unsubscribe;
  }, [navigation, buscarReceitas, buscarCategorias]);

  const receitasFiltradas = categoriaSelecionada
    ? receitas.filter(r => r.categoria_id === categoriaSelecionada)
    : receitas;

  const handleDeleteReceita = async (id) => {
    try {
      await api.delete(`/receitas/${id}`);
      buscarReceitas();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível deletar a receita.');
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await api.delete(`/categorias/${id}`);
      buscarCategorias();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível deletar a categoria.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setCategoriaSelecionada(null)} style={styles.categoryButton}>
          <Text style={[styles.categoryButtonText, !categoriaSelecionada && styles.categoryButtonTextActive]}>Todas</Text>
        </TouchableOpacity>
        {categorias.map(cat => (
          <TouchableOpacity key={cat.id} onPress={() => setCategoriaSelecionada(cat.id)} style={styles.categoryButton}>
            <Text style={[styles.categoryButtonText, categoriaSelecionada === cat.id && styles.categoryButtonTextActive]}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={receitasFiltradas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.receitaCard}>
            <Text style={styles.receitaNome}>{item.nome}</Text>
            <Text style={styles.receitaCategoria}>
              Categoria: {categorias.find(c => c.id === item.categoria_id)?.nome || 'N/A'}
            </Text>
            <Text>Ingredientes: {item.ingredientes}</Text>
            <Text>Modo de Preparo: {item.modo_preparo}</Text>
            <TouchableOpacity onPress={() => handleDeleteReceita(item.id)} style={styles.deleteButtonReceita}>
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhuma receita encontrada.</Text>}
        style={{ marginBottom: 70 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewRecipe', { categorias })}
      >
        <Text style={styles.fabText}>Nova Receita</Text>
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  receitaCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  receitaNome: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  receitaCategoria: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  categoryButton: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  categoryButtonTextActive: {
    color: 'blue',
  },
  deleteButton: {
    marginLeft: 2,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonReceita: {
    marginTop: 8,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});