import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha.');
      return;
    }
    try {
      const res = await api.post('/login', { email, senha });
      Alert.alert('Sucesso', 'Login realizado!');
  navigation.navigate('Recipes', { usuario: res.data.usuario });
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.buttonSecondaryText}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonSecondaryText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  link: {
    color: '#007bff',
    marginTop: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonSecondaryText: {
    color: '#2196f3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});