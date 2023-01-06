import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/header.css';

function Header({ basketData }) {

    return (
        <div className='header'>
            <Link to="/">
                <img
                    className='header_logo'
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=''
                />
            </Link>

            <div className='header_search'>
                <input
                    className='header_searchInput'
                    type="text"
                />
                {/* logo */}
                <SearchIcon
                    className='header_searchIcon'
                />
            </div>

            <div className='header_nav'>
                <div className='header_option'>
                    <span className='header_optionLneOne'>
                        Hello, Guest
                    </span>
                    <span className='header_optionLneTwo'>
                        Sign In
                    </span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLneOne'>
                        Returns
                    </span>
                    <span className='header_optionLneTwo'>
                        & Orders
                    </span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLneOne'>
                        Your
                    </span>
                    <span className='header_optionLneTwo'>
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionLneTwo header_BasketCount'>
                            {basketData?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketData: state.basketReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addToCart: (data) => { dispatch(addToBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
