import React, { Component } from "react";
import { Table } from "reactstrap"; // "reactstrap" kütüphanesinden Table bileşenini içe aktarır

export default class CartList extends Component {
  renderCart() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.id}</td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <div>{this.renderCart()}</div>;
  }
}
