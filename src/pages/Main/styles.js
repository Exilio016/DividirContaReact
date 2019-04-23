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

  title: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  titleContainer:{
    backgroundColor: "#BBB"
  },

  list: {
    marginTop: 30
  },

  item: {
    flexDirection: "column",
    paddingVertical: 3
  },

  separator: {
    height: 1,
    backgroundColor: "#EEE"
  },

  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemValue: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10
  },

  itemName: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10
  },

  itemAmount: {
    fontSize: 14,
    color: "#666"
  },

  fab: {
    position: "absolute",
    zIndex: 10,
    right: 30,
    bottom: 30 + getBottomSpace(),
    width: 60,
    height: 60,
    backgroundColor: "#7159c1",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },

  menu :{
    fontSize: 14
  }
});

export default styles;
