import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid/v4';


export default new class Person {
  array = [];

  createPerson = async (name) => {
    try {
      const value = await AsyncStorage.getItem('@DividirConta:People');
      if(value !== null) {
        this.array = JSON.parse(value);
      }

      this.array.push({
        name: name,
        id:uuid()
      });
      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:People', string);
    } catch(e) {
      // error reading value
    }
  }

  getPerson = async () => {
    try{
      const value = await AsyncStorage.getItem('@DividirConta:People');
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
      const value = await AsyncStorage.getItem('@DividirConta:People');
      if(value !== null) {
        this.array = JSON.parse(value);
      }
      this.array = this.array.filter((value) =>{
        return value.id != id;
      });

      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:People', string);
    } catch(e) {
      // error reading value
    }
  }

  clear = async () => {
    try {
      this.array = [];
      const string = JSON.stringify(this.array);
      await AsyncStorage.setItem('@DividirConta:People', string);
    } catch(e) {
      // error reading value
    }
  }
};