import React            from 'react';
import { connect }      from 'react-redux';
import { addToBasket }  from '../redux/action';
import '../css/product.css';

function Product({ id, title, image, price, rating, addToCart }) {

    function handleBasket() {
        //dispatch action
        addToCart({
            id      : id,
            title   : title,
            price   : price,
            rating  : rating,
            image   : image
        })
    }

    return (
        <div className = 'product'>
            <div className = 'product_info'>
                <p>{title}</p>
                <p className = 'product_price'>
                    <small> ₹ </small>
                    <strong>{price}</strong>
                </p>
                <div className = 'product_rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
            </div>

            <img
                src = {image}
                alt = ''
            />

            <button onClick={handleBasket}>Add to Basket</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        // noteData: state.noteReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (data) => { dispatch(addToBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);