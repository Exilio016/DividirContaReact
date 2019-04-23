import React, { Component } from 'react';

import { View, Text, FlatList } from 'react-native';
import Person from '../../services/person';
import Product from '../../services/product';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuProvider, Menu, MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';


export default class Main extends Component {
  state = {
    totalValue: 0.0,
    people: [],
    products: []
  }

  auxId = ''

  async componentDidMount(){
    const people = await Person.getPerson();
    const products = await Product.getAll();

    let value = 0.0
    products.forEach(item => {
      value += (item.unitValue * item.amount);
    });

    this.setState({totalValue: value, people: people, products: products});
  }

  getPersonBill = (id) => {
    let value = 0.0;
    this.state.products.forEach((item) => {
      item.people.map((person) => {
        if (person.id === id){
          value += (item.unitValue *item.amount) / item.people.length;
        }
      });
    });
    
    return value;
  }

  addPeson = () => {
    this.props.navigation.navigate('AddPerson');
  }
  
  addProduct = () => {
    this.props.navigation.navigate('AddProduct');
  }

  renderProduct = ({ item }) => (
    <Menu name={"productMenu:"+ item.id}>
      <MenuTrigger triggerOnLongPress={true}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemInfo}>
            <Text style={styles.itemValue}>Valor unitário: { item.unitValue.toFixed(2) }</Text>
            <Text style={styles.itemAmount}>Quantidade: { item.amount }</Text>
          </View>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption text="Remover Produto" onSelect={async () => {
          await Product.remove(item.id);
          const p = await Product.getAll();
          let value = this.state.totalValue;
          value -= (item.unitValue * item.amount);

          this.setState({... this.state, products: p, totalValue: value});
          return true;
        }}/>
        <MenuOption text="Aumentar Quantidade" onSelect={async ()=>{
          await Product.incressAmount(item.id, 1);
          const p = await Product.getAll();
          let value = this.state.totalValue;
          value += item.unitValue;
          this.setState({... this.state, products: p, totalValue: value});
        }}/>
        <MenuOption text="Diminuir Quantidade" onSelect={async ()=>{
          await Product.incressAmount(item.id, -1);
          const p = await Product.getAll();
          let value = this.state.totalValue;
          value -= item.unitValue;
          this.setState({... this.state, products: p, totalValue: value});
        }}/>
        <MenuOption text="Limpar Lista" onSelect={this.clearProducts}/>
      </MenuOptions>
    </Menu>
    
  );
  clearPeople = async () =>{
    await Person.clear();
    this.setState({... this.state, people: []});
    return true;
  }

  clearProducts = async () =>{
    await Product.clear();
    this.setState({... this.state, products: [], totalValue: 0.0});
    return true;
  }

  renderPerson = ({ item }) => (
    <Menu name={"personMenu:" + item.id}>
      <MenuTrigger triggerOnLongPress={true}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemValue}>Total a pagar: {`${this.getPersonBill(item.id).toFixed(2)}`}</Text>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption text="Remover Pessoa" onSelect={async () => {
          await Person.remove(item.id);
          const people = await Person.getPerson();
          this.setState({... this.state, people: people});
          return true;
        }}/>
        <MenuOption text="Limpar Lista" onSelect={this.clearPeople}/>
      </MenuOptions>
    </Menu>  );

  render() {
    return (
      <MenuProvider>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Dividir Conta</Text>
        </View>

        <Text style={styles.list}>Produtos pedidos:</Text>
        <FlatList 
          data={this.state.products}
          keyExtractor={(item) => (item.id)}
          renderItem={this.renderProduct}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />

        <Text >Pessoas na mesa:</Text>
        <FlatList 
          data={this.state.people}
          keyExtractor={(item) => (item.id)}
          renderItem={this.renderPerson}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        /> 

        <View style={styles.footer}>
          <Text>Valor total da mesa: {this.state.totalValue.toFixed(2)}</Text>
            <Menu name="addMenu" >
              <MenuTrigger style={styles.menu}>
                <TouchableOpacity>
                  <Icon name="plus-circle"  size={50} />
                </TouchableOpacity>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption text="Adicionar Pessoa" onSelect={this.addPeson} />
                <MenuOption text="Adicionar Produto" onSelect={this.addProduct}/>
              </MenuOptions>
            </Menu>
        </View>        
      </View>
      </MenuProvider>

    );
  }
}
