import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    // mevcut sepet verisini kopyala
    let newCart = this.state.cart;
    // Eklenecek ürünün sepette olup olmadığını kontrol et

    var addedItem = newCart.find((c) => c.product.id === product.id);
    // Eğer ürün sepette varsa, miktarını arttır

    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      // Eğer ürün sepette yoksa, yeni bir öğe olarak ekle

      newCart.push({ product: product, quantity: 1 });
    }
    // State'i güncelleyerek yeni sepeti kaydet

    this.setState({ cart: newCart });

    // Sepete ürün eklediğinizde bir bildirim görüntüleyebilirsiniz
    alertify.success(product.productName + "added to cart");
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  render() {
    const productInfo = { title: "Product List" };
    const categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Row>
            <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          </Row>

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
