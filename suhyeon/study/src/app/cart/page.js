export default function Cart() {
  let 장바구니 = ["Tomatoes", "Pasta"];
  return (
    <div>
      <h4>Cart</h4>
      <CartItem 상품={장바구니[0]} />
      <CartItem 상품={장바구니[1]} />
    </div>
  );
}

function CartItem(props) {
  return (
    <div className="cart-item">
      <p>{props.상품}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
