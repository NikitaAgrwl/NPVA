import React from 'react';
import '../css/checkoutProduct.css';
import { removeFromBasket } from '../redux/action';
import { connect } from 'react-redux';

function CheckoutProduct({ compId, id, image, title, price, rating, removeItem }) {

    function removeFromBasket() {
        removeItem(compId)
    }

    return (
        <div className='checkoutProduct'>
            <img
                className='checkoutProduct_image'
                src={image}
                alt=''
            />

            <div className='checkoutProduct_info'>
                <p className='checkoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct_rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // basketData: state.basketReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeFromBasket(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutProduct);
