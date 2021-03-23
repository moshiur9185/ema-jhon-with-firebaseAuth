import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { ProductKey } = useParams()
    const product = fakeData.find((pd) => pd.key === ProductKey)
    console.log(product)
    return (
        <div>
            <h1>Your Produce Details</h1>
            <Product showAddToCard={false} product={product}></Product>

        </div>
    );
};

export default ProductDetail;