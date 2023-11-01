### App.js

```js
addToCart = (product) => {
  // mevcut sepet verisini kopyalar
  let newCart = this.state.cart;
  // Eklenecek ürünün sepette olup olmadığını kontrol eder
  var addedItem = newCart.find((c) => c.product.id === product.id);
  // Eğer ürün sepette varsa, miktarını arttır
  if (addedItem) {
    addedItem.quantity += 1;
  } else {
    // Eğer ürün sepette yoksa, yeni bir öğe olarak ekle
    newCart.push({ product: product, quantity: 1 });
  }

  // State'i güncelleyerek yeni sepeti kaydeder
  this.setState({ cart: newCart });

  // Navi bileşenini çağır ve removeFromCart işlevi ile cart verisini ileterek yapılan işlem
  <Row>
    <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
  </Row>;
};
// sepetteki ürün miktarını arttırmak için
<ProductList addToCart={this.addToCart} />;

// Sepetten bir ürünü kaldırmak için kullanılan işlev.
removeFromCart = (product) => {
  let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
  this.setState({ cart: newCart });
};
//Mevcut sepet verisini temsil eden 'this.state.cart' dizisini filtreler.

// Sepete ürün eklediğinizde bir bildirim görüntüleyebilirsiniz
alertify.success(product.productName + "added to cart");

//01/11/2023
//ana sayfa routesı
<Routes>
  <Route
    exact // tam olarak eşleşen URL için bu yolu işaretler
    path="/" // Kök URL ile eşleşir (ana sayfa)
    element={
      // Eşleştiğinde görüntülenecek bileşen
      <ProductList
        products={this.state.products}
        addToCart={this.addToCart}
        currentCategory={this.state.currentCategory}
        info={productInfo} // Başka bir bileşenden gelen ek bilgiler
      />
    }
  />
  {/* Alışveriş Sepeti için Route 
  Route, 
  web uygulamalarında URL yollarını belirli sayfalara veya bileşenlere yönlendirmek için kullanılan bir yapıdır*/}

  <Route
    path="/cart" // "/cart" URL ile eşleşir
    element={
      // Eşleştiğinde görüntülenecek bileşen
      <CartList cart={this.state.cart} removeFromCart={this.removeFromCart} /> // Alışveriş sepetinden ürün kaldırmak için işlev
    }
  />
  <Route element={<NotFound></NotFound>}></Route>
</Routes>;
```

### CartSummary.js

```js
// Sepetin içeriğini alır ve her ürünü listeler. Her ürün, ürün adı ve miktarını içeren bir liste öğesi olarak görüntülenir.

 renderSummary() {
    const { cart } = this.props;

    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret></DropdownToggle>
        Your Cart({cart.length}) {/* Sepetteki ürün sayısını gösterir. */}
        <DropdownMenu end>
          {cart.map((cartItem) => (
            // Sepetteki her öğeyi listeleyen bileşen
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName} {/* Ürünün adı */}
              <Badge color="info">{cartItem.quantity}</Badge> {/* Ürün miktarı */}
            </DropdownItem>
          ))}

          <DropdownItem divider />

          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  // Boş sepet durumunu renderlayan fonksiyon
  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }
    // Ana render fonksiyonu
  render() {
    return (
      <div>
        {this.props.cart.length > 0 // sepetteki ürün sayısını kontrol eder
          ? this.renderSummary() // sepet boşsa
          : this.renderEmptyCart()}  {/*sepet doluysa*/}

      </div>
    );
  }

//alışveriş sepetinin özetini görüntülemek için
  <CartSummary
              removeFromCart={this.props.removeFromCart}
              cart={this.props.cart}
            />
 <Badge color="danger" onClick={() => this.props.removeFromCart(cartItem.product)}></Badge>//sepetten çıkarılacak olan ürünü temsil eder.

import { Link } from "react-router-dom";

 <DropdownItem>
            <Link to="cart">Go to cart</Link>
          </DropdownItem>
```

### CategoryList.js

```js
//menü açma kapama
 constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

// Her bir kategori öğesi için bir döngü oluşturuyoruz.
// Bu döngü, dizinin her öğesini tek tek işleyecek.
// category, her öğeyi temsil eden geçici bir değişken.
<ListGroup>
  {this.state.categories.map((category) => (
    <ListGroupItem
      // Eğer kategori adı, mevcut kategoriyle aynı ise, bu özellik "active" (etkin) olarak ayarlanır.  eğer değilse etkin olmayan bir durumda kalır
      active={
        category.categoryName === this.props.currentCategory ? true : false
      }
      // Kullanıcı bir kategoriye tıkladığında, changeCategory adlı işlevi çağırarak seçilen kategoriyi değiştirir.
      onClick={() => this.props.changeCategory(category)}

      // her öğeye benzersiz bir kimlik (key) atar ve React'in bu öğeleri daha verimli bir şekilde güncellemesine yardımcı olur.
      key={category.categoryId}
    >
      {category.categoryName}
    </ListGroupItem>
  ))}
</ListGroup>
```

### İndex.js

```js
//<BrowserRouter> React Router gibi yönlendirme işlevselliğini etkinleştirir ve <App> ana uygulama bileşenini başlatır.
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
```

### Navi.js

```js

```

### ProductList.js

```js

```

### Not Found.js

```js

```

### Cart List.js

```js
import React, { Component } from "react";
import { Table } from "reactstrap"; // "reactstrap" kütüphanesinden Table bileşenini içe aktarır

export default class CartList extends Component {
  renderCart() {
    // renderCart adında bir fonksiyon tanımlar

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
    {
      /* "renderCart" fonksiyonunu çağırarak alışveriş sepetini gösterir */
    }
  }
}
```

### Package.json

```js
npm install react-router-dom
// sayfalar arası gezinme ve yönlendirme işlevselliği eklemek için kullanılır

npm install alertifyjs
// kullanıcıya bilgi, hata, onay ve diğer türde bildirimler göstermek için kullanılır.
```

```js

```
