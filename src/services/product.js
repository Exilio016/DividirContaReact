import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid/v4';


export default new class Product {
  array = [];
//{name: 'Cerveja', id:uuid(), people:[], amount: 1, unitValue: 7.5}

  create = async (name, people, unitValue, amount=1) => {
    try {
      const value = await AsyncStorage.getItem('@DividirConta:Products');
      if(value !== null) {
        this.array = JSON.parse(value);
      }

      this.array.push({
        name: name,
        id:uuid(),
        people: people,
        amount: amount,
        unitValue: unitValue
      });
      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:Products', string);
    } catch(e) {
      // error reading value
    }
  }

  incressAmount = async (id, amount) => {
    try {
      const value = await AsyncStorage.getItem('@DividirConta:Products');
      if(value !== null) {
        this.array = JSON.parse(value);
      }
      
      const index = this.array.findIndex((value) =>{
        return value.id === id
      });

      if(index >= 0){
        this.array[index].amount += amount;
      }

      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:Products', string);
    } catch(e) {
      // error reading value
    }

  }

  getAll = async () => {
    try{
      const value = await AsyncStorage.getItem('@DividirConta:Products');
      if(value != null) {
        this.array = JSON.parse(value);
      }
      return this.array;

    }catch (e){
      return null;
    }
  }

  remove = async (id) => {
    try {
      const value = await AsyncStorage.getItem('@DividirConta:Products');
      if(value !== null) {
        this.array = JSON.parse(value);
      }
      this.array = this.array.filter((value) =>{
        return value.id != id;
      });

      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:Products', string);
    } catch(e) {
      // error reading value
    }
  }

  clear = async () => {
    try {
      this.array = [];
      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:Products', string);
    } catch(e) {
      // error reading value
    }
  }
};