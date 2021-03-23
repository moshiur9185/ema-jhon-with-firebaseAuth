import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [card, setCard] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()

    const handelProceedChekout = () => {
        history.push('/shipment')
        // setCard([])
        // setOrderPlaced(true)
        // processOrder()

    }

    const removeProduct = (productKey) => {
        const newCard = card.filter(pd => pd.key !== productKey)
        setCard(newCard)
        removeFromDatabaseCart(productKey)

    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cardProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product
        });
        setCard(cardProduct)
    }, [])
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={HappyImage} alt="" />

    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    card.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="card-container">
                <Cart cart={card}>
                    <button onClick={handelProceedChekout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>


        </div>
    );
};

export default Review;