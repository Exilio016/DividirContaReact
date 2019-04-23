import React, { Component } from 'react';

import { View, FlatList, Text, TextInput, TouchableOpacity, Touchable } from 'react-native';
import Product from '../../services/product';
import Person from '../../services/person';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default class AddProduct extends Component {
  state = {
    productName: '',
    productAmount: null,
    productValue: null,
    people: []
  }

  async componentDidMount(){
    const p = await Person.getPerson();
    p.forEach(item => {
      item.checked = false;
    });

    this.setState({... this.state, people: p})
  }

  renderPerson = ({ item }) => (
    <TouchableOpacity onPress={async () => {
      const p = [... this.state.people];
      p.map((value) => {
        if(value.id === item.id){
          value.checked = !value.checked;
        }
      });
      this.setState({... this.state, people: p});
    }} style={styles.checkBox}>
      <Icon name={item.checked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24}/>
      <Text>{item.name}</Text>
    </TouchableOpacity>
    
);

  handleSubmit = async () =>{
    if(!this.state.productName){
      alert("Você deve preencher um nome!");
      return;
    }
    let value, amount = 1

    if(!this.state.productValue){
      alert("Você deve preencher um valor!");
      return;
    }

    if(this.state.people.length === 0){
      alert("Você deve relacionar esse produto com pelo menos uma pessoa!");
      return;
    }

    try{
      value = parseFloat(this.state.productValue);
      if(this.state.productAmount){
        amount = parseInt(this.state.productAmount);
      }

      if(!value || !amount){
        alert("A Quantidade e o Valor devem ser numéricos");
        return;    
      }
    }catch(e) {
      alert("A Quantidade e o Valor devem ser numéricos");
      return;
    }
    let people = [];
    this.state.people.forEach((item) =>{
      if(item.checked){
        people.push({id: item.id});
      }
    });

    await Product.create(this.state.productName, people, value, amount);
    this.props.navigation.navigate('Main');
  }

  handleCancel = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
    <View style={styles.container}>
      <TextInput
        placeholder="Adicione um produto"
        placeholderTextColor="#999"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={this.state.productName}
        onChangeText={text => this.setState({... this.setState, productName: text })}
      />
      <TextInput
        placeholder="Quantidade do produto"
        placeholderTextColor="#999"
        autoCorrect={false}
        keyboardType='numeric'
        underlineColorAndroid="transparent"
        value={this.state.productAmount}
        onChangeText={text => this.setState({ ... this.setState, productAmount: text })}
      />
      <TextInput
        placeholder="Valor do produto"
        placeholderTextColor="#999"
        autoCorrect={false}
        keyboardType='numeric'
        underlineColorAndroid="transparent"
        value={this.state.productValue}
        onChangeText={text => this.setState({... this.setState, productValue: text })}
      />
      <FlatList
        data={this.state.people}
        keyExtractor={(item) => (item.id)}
        renderItem={this.renderPerson}
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
