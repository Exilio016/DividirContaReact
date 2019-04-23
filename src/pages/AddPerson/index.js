import React, { Component } from 'react';

import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Person from '../../services/person'

import styles from './styles';

export default class AddPerson extends Component {
  state = {
    newPerson: ''
  }
  
  handleSubmit = async () =>{
    if(!this.state.newPerson){
      alert("Você deve preencher um nome!");
      return;
    }

    await Person.createPerson(this.state.newPerson);
    this.props.navigation.navigate('Main');
  }

  handleCancel = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Adicione uma pessoa"
          placeholderTextColor="#999"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.newPerson}
          onChangeText={text => this.setState({ newPerson: text })}
          />
          <View>
            <TouchableOpacity onPress={this.handleCancel}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.handleSubmit}>
              <Text>Criar</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
