import React, { Component } from "react";
import { Text, View, LayoutAnimation } from "react-native";
import { Card, Title, ProgressBar, Button } from "react-native-paper";
import axios from "axios";
import CartView from "./CartView";
import styles from "./CartStyles";
import RoundCheckbox from "rn-round-checkbox";

class CartApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axiosData: [],
      listProducts: [],
      listSelectedProducts: [],
      listInCart: [],
    };
  }

  async componentDidMount() {
    await axios(`https://mock.itsitchy.com/products`)
      .then((response) => {
        this.setState({
          axiosData: response.data,
          listProducts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selectProduct = (product) => {
    if (!this.state.listSelectedProducts.includes(product)) {
      this.setState({
        listSelectedProducts: [...this.state.listSelectedProducts, product],
      });
    } else {
      let filteredArray = this.state.listSelectedProducts.filter(
        (item) => item !== product
      );
      this.setState({ listSelectedProducts: filteredArray });
    }
  };

  addToCart = () => {
    this.state.listSelectedProducts.map((item) => {
      if (!this.state.listInCart.includes(item)) {
        this.state.listInCart.push(item);
      }
    });

    let filteredArray = [];
    this.state.listSelectedProducts = [];

    this.state.listProducts.map((item) => {
      if (!this.state.listInCart.includes(item)) {
        filteredArray.push(item);
      }
    });

    this.setState({
      listInCart: this.state.listInCart,
      listProducts: filteredArray,
    });
  };

  deleteFromCart = (product) => {
    let filteredCart = this.state.listInCart.filter((item) => item !== product);
    let filteredProducts = this.state.listSelectedProducts.filter(
      (item) => item !== product
    );

    !this.state.listProducts.includes(product) &&
      this.state.listProducts.unshift(product);

    this.setState({
      listInCart: filteredCart,
      listSelectedProducts: filteredProducts,
      listProducts: this.state.listProducts,
    });
  };

  renderProducts = (added) => {
    let list = added ? this.state.listProducts : this.state.listInCart;

    return list.map((item) => (
      <Card
        style={Object.assign(
          !added && { opacity: "0.4" },
          styles.card,
          styles.product
        )}
      >
        <Card.Content>
          <Title style={styles.textTitle}>{item.name}</Title>
          <View style={styles.positionRight}>
            <RoundCheckbox
              size={24}
              checked={
                !added ? "true" : this.state.listSelectedProducts.includes(item)
              }
              onValueChange={() => added && this.selectProduct(item)}
            />
          </View>
          <Title style={styles.blackText}>{item.price} kr</Title>
        </Card.Content>
      </Card>
    ));
  };

  renderCart = () => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cartTitle}>Shopping Cart</Title>
          <Text style={styles.subtitleText}>
            Items{" "}
            <Text style={styles.blackText}>
              {this.state.listInCart.length}/{this.state.axiosData.length}
            </Text>
          </Text>
          <ProgressBar
            indeterminate={false}
            color="dodgerblue"
            progress={
              this.state.listInCart.length / this.state.axiosData.length
            }
            style={styles.progressBar}
          />
        </Card.Content>

        {this.state.listInCart.map((item) => (
          <View style={styles.cartItems}>
            <Text style={styles.cartItemTitle}>{item.name}</Text>
            <View style={styles.deleteCartView}>
              <Text
                style={styles.deleteCartText}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.deleteFromCart(item);
                }}
              >
                Delete
              </Text>
            </View>
            <View style={styles.cartItemSubtitle}>
              <Text style={styles.blackText}>{item.price + " kr"}</Text>
            </View>
          </View>
        ))}
      </Card>
    );
  };

  renderSelectedProducts = () => {
    return (
      <View style={styles.nocard}>
        <Text style={styles.textTitle}>Products</Text>
        <Text style={styles.subtitleText}>
          Selected: {this.state.listSelectedProducts.length}
        </Text>
      </View>
    );
  };

  renderAddToCart = () => {
    return (
      <View style={styles.nocard}>
        <Button
          mode="contained"
          color="dodgerblue"
          contentStyle={{ height: 50 }}
          style={styles.buttonAdd}
          disabled={this.state.listSelectedProducts.length == 0}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.addToCart();
          }}
        >
          Add to cart
        </Button>
      </View>
    );
  };

  render() {
    //const { listProducts } = this.state;
    return (
      <CartView
        /*
         * renderCart, shopping cart
         * selectedProducts, shows our selected but not added products
         * product, show each product
         * renderProducts, show prod with bool, for added or not
         * renderAddToCart, our button for adding selected products to cart
         */
        renderCart={this.renderCart}
        renderSelectedProducts={this.renderSelectedProducts}
        renderProducts={this.renderProducts}
        renderAddToCart={this.renderAddToCart}
      />
    );
  }
}

export default CartApi;
