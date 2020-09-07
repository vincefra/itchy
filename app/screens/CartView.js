import React from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import styles from "./CartStyles";

const CartView = (props) => {
  const {
    renderCart,
    renderSelectedProducts,
    renderProducts,
    renderAddToCart,
  } = props;

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <ScrollView>
        {renderCart()}
        {renderSelectedProducts()}
        {renderProducts(true)}
        {renderProducts(false)}
      </ScrollView>
      {renderAddToCart()}
    </SafeAreaView>
  );
};

export default CartView;
