import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleChangePassword = async () => {
    if (!email || !novaSenha) {
      Alert.alert('Erro', 'Preencha email e nova senha.');
      return;
    }
    try {
      // Buscar usuário pelo email
      const res = await api.get('/usuarios');
      const usuario = res.data.find(u => u.email === email);
      if (!usuario) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }
      await api.put(`/usuarios/${usuario.id}`, { ...usuario, senha: novaSenha });
      Alert.alert('Sucesso', 'Senha alterada!');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao alterar senha');
    }
  };

  return (
    <View style={styles.container}>
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
        placeholder="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />
      <Button title="Alterar Senha" onPress={handleChangePassword} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
  // title removido
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});