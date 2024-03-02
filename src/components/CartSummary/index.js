// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmount = cartList.reduce(
        (prev, current) => prev + current.quantity * current.price,
        0,
      )
      return (
        <div className="card-summary">
          <h1 className="card-summary-heading">
            Order Total: Rs{totalAmount}/-
          </h1>
          <p className="card-summary-items-count">
            {cartList.length} Items in cart
          </p>
          <button className="card-summary-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
