// scripts/Orders.js
import { getWheels, getTechnologies, getPaints, getInteriors, placeOrder, resetState } from './State.js';

const Orders = async () => {
    console.log('Orders function started...');
    const html = `<button id="place-order">Place Order</button>`;
    console.log('Orders HTML generated.');
    return html;
};

export const handlePlaceOrder = async () => {
    console.log('Place order function started...');

    const order = {
        wheelsId: getWheels(),
        technologiesId: getTechnologies(),
        paintsId: getPaints(),
        interiorsId: getInteriors(),
    };

    console.log('Order details before sending:', order);

    try {
        const response = await fetch('http://localhost:8088/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        console.log('Fetch request sent. Response status:', response.status);

        if (response.ok) {
            const newOrder = await response.json();
            console.log('New order JSON parsed:', newOrder);
            placeOrder(newOrder);
            resetState();
            console.log('State reset after order placement.');
            document.dispatchEvent(new CustomEvent('stateChanged'));
            console.log('State changed event dispatched.');
        } else {
            console.error('Response not OK. Status:', response.status);
        }
    } catch (error) {
        console.error('Failed to place order:', error);
    }
};

export const renderOrders = async () => {
    console.log('Render orders function started...');
    const ordersHtml = await Orders();
    console.log('Orders HTML generated.');
    const ordersElement = document.createElement('div');
    ordersElement.innerHTML = ordersHtml;
    console.log('Orders element created.');

    const placeOrderButton = ordersElement.querySelector('#place-order');
    console.log('Place order button found:', placeOrderButton);
    placeOrderButton.addEventListener('click', handlePlaceOrder);
    console.log('Event listener added to place order button.');

    return ordersElement;
};
