import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import '../css/header.css';

function Header() {
    return (
        <div className='header'>
            <img
                className='header_logo'
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=''
            />

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
                <div className='header_optionBasket'>
                    <ShoppingBasketIcon />
                    <span className='header_optionLneTwo header_BasketCount'>
                        0
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header
