import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import 'reactjs-popup/dist/index.css'

import './index.css'

class CartSummary extends Component {
  state = {option: 'Card', confirm: false}

  onChangeOption = event => {
    this.setState({option: event.target.value})
  }

  onConfirm = () => {
    console.log('hi')
    this.setState(prevState => ({confirm: !prevState.confirm}))
  }

  render() {
    const {option, confirm} = this.state
    const tem = true
    console.log(confirm)
    return (
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

              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button className="card-summary-button" type="button">
                      Checkout
                    </button>
                  }
                >
                  <>
                    {confirm ? (
                      <p className="confirmationSuccess">
                        Your order has been placed successfully
                      </p>
                    ) : (
                      <div className="paymentPopup">
                        <h1 className="card-summary-heading">
                          Order Total: Rs{totalAmount}/-
                        </h1>
                        <p className="card-summary-items-count">
                          {cartList.length} Items in cart
                        </p>
                        <div className="dropDown">
                          <select value={option} onChange={this.onChangeOption}>
                            <option selected value="Card" disabled={tem}>
                              Card
                            </option>
                            <option value="Net Banking" disabled={tem}>
                              Net Banking
                            </option>
                            <option value="UpiWallet" disabled={tem}>
                              UpiWallet
                            </option>
                            <option value="Cash on Delivery">
                              Cash on Delivery
                            </option>
                          </select>
                        </div>
                        <button
                          disabled={option !== 'Cash on Delivery'}
                          onClick={this.onConfirm}
                          className={
                            option === 'Cash on Delivery'
                              ? 'confirmOrderButton confirm'
                              : 'confirmOrderButton'
                          }
                          type="button"
                        >
                          Confirm Order
                        </button>
                      </div>
                    )}
                  </>
                </Popup>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
