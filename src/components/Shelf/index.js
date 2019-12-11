import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductList from './ProductList'


import { fetchProducts } from '../../services/shelf/actions';

import './style.scss';

class Shelf extends Component {
    static propTypes = {
        fetchProducts: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired
    }

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.handleFetchProducts();
    }

    handleFetchProducts = () => {

        this.setState({ isLoading: true });

        this.props.fetchProducts(() => {
            this.setState({ isLoading: false });
        })
    }

    render() {

        const products = this.props.products;
        const isLoading = this.state.isLoading;

        return (
            <React.Fragment>
                {isLoading}
                <div className="shelf-container">

                    <ProductList products={products}></ProductList>

                </div>
            </React.Fragment>

        )

    }
}

const mapStateToProps = state => ({
  products: state.shelf.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);