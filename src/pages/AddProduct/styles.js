import { StyleSheet, Platform } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0,
    flex: 1,
    marginBottom: 15
  },

  checkBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default styles;
