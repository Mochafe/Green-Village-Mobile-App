import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Authentication} from '../fetch/Authentification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authStyles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  label: {
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    width: '80%',
  },
  button: {
    marginTop: 25,
  },
});

const Authentification = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={authStyles.main}>
      <View style={authStyles.inputGroup}>
        <Text style={authStyles.label}>E-mail</Text>
        <TextInput
          placeholder="example@example.com"
          style={authStyles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={authStyles.inputGroup}>
        <Text style={authStyles.label}>Mot de passe</Text>
        <TextInput
          placeholder="••••••"
          style={authStyles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={authStyles.button}>
        <Button
          title={'Connection'}
          onPress={() => {
            console.log('click');
            Authentication({username, password}, navigation).then(response => {
              if (!response.token) {
                return;
              }

              AsyncStorage.setItem('token', response.token);
              navigation.navigate('Categories');
            });
          }}
        />
      </View>
    </View>
  );
};

export default Authentification;
