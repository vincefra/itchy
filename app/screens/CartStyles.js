import React, { Component } from "react";
import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("screen").height;
const styles = {
  Container: { flex: 1 },
  scrollView: {
    maxHeight: "70%",
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    shadowRadius: 4,
    borderRadius: 10,
  },
  cartItems: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  deleteCartView: {
    bottom: "35%",
    alignItems: "flex-end",
  },
  deleteCartText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  nocard: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
  },
  cartTitle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cartItemSubtitle: {
    bottom: "33%",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitleText: {
    fontWeight: "bold",
    color: "lightslategrey",
  },
  blackText: {
    color: "#000",
    fontWeight: "bold",
  },
  product: {
    shadowRadius: 0,
    backgroundColor: "#E9F4FF",
  },
  progressBar: {
    marginVertical: 5,
    borderRadius: 10,
    height: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  positionRight: {
    alignItems: "flex-end",
  },
  buttonAdd: {
    borderRadius: 10,
    marginHorizontal: 10,
  },
};
export default styles;
