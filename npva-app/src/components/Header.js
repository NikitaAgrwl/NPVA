import React                    from 'react';
import SearchIcon               from '@material-ui/icons/Search';
import ShoppingBasketIcon       from '@material-ui/icons/ShoppingBasket';
import { Link }                 from 'react-router-dom';
import { connect }              from 'react-redux';
import { auth }                 from '../firebase';
import '../css/header.css';

function Header({ basketData, userData }) {

    function handleAuthentication() {
        if (userData) {
            auth.signOut();
        }
    }

    return (
        <div className = 'header'>
            <Link to="/">
                <img
                    className   = 'header_logo'
                    src         = "https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt         = ''
                />
            </Link>

            <div className = 'header_search'>
                <input
                    className   = 'header_searchInput'
                    type        = "text"
                />
                {/* logo */}
                <SearchIcon
                    className = 'header_searchIcon'
                />
            </div>

            <div className = 'header_nav'>
                <Link to = {!userData && "/login"}>
                    <div 
                        onClick     = {handleAuthentication} 
                        className   = 'header_option'>
                        <span className = 'header_optionLneOne'>
                            Hello, {userData ? userData : 'Guest'}
                        </span>
                        <span className = 'header_optionLneTwo'>
                            {userData ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to = "/orders">
                    <div className = 'header_option'>
                        <span className = 'header_optionLneOne'>
                            Returns
                        </span>
                        <span className = 'header_optionLneTwo'>
                            & Orders
                        </span>
                    </div>
                </Link>
                <div className = 'header_option'>
                    <span className = 'header_optionLneOne'>
                        Your
                    </span>
                    <span className = 'header_optionLneTwo'>
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className = 'header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className = 'header_optionLneTwo header_BasketCount'>
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
        basketData: state.basketReducer.basket,
        userData: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addToCart: (data) => { dispatch(addToBasket(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
