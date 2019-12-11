import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Product = ({product})=>{

    product.quantity = 1 ;

    return ( <div
        className="shelf-item">

        <p className="shelf-item__title">{product.name +' '+ product.surname}</p>
        <div className="shelf-item__price">
          <div className="val">
          </div>
          
        </div>
        <div className="shelf-item__buy-btn">Add to cart</div>
      </div>);

}

Product.propTypes = {
    product: PropTypes.object.isRequired,
  };

export default Product;