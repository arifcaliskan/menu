import React, {useContext} from 'react'
import { CartContext } from '../context/cart'

const CartItem = (props) => {
  const {id, title, price, img} = props.data;
  const {CartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(CartContext)

  return (
    <div className="cartItem">
      <img src={img} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={CartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem