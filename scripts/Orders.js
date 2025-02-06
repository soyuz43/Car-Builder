// scripts/Orders.js
import { getWheels, getTechnologies, getPaints, getInteriors, placeOrder, resetState } from './State.js';

const Orders = async () => {
    const html = `<button id="place-order">Place Order</button>`;
    return html;
};
const resetDropdowns = () => {
    document.getElementById("wheels").selectedIndex = 0;
    document.getElementById("technologies").selectedIndex = 0;
    document.getElementById("paints").selectedIndex = 0;
    document.getElementById("interiors").selectedIndex = 0;
  };
  
  export const handlePlaceOrder = async () => {
    // Get the values of the selected options
    const wheels = document.getElementById("wheels").value;
    const technologies = document.getElementById("technologies").value;
    const paints = document.getElementById("paints").value;
    const interiors = document.getElementById("interiors").value;

    // Check if any of the options are missing
    if (wheels === "0" || technologies === "0" || paints === "0" || interiors === "0") {
        let errorMessage = "The following selections are missing: ";
        if (wheels === "0") {
            errorMessage += "wheels, ";
        }
        if (technologies === "0") {
            errorMessage += "technologies, ";
        }
        if (paints === "0") {
            errorMessage += "paints, ";
        }
        if (interiors === "0") {
            errorMessage += "interiors";
        }
        window.alert(errorMessage);
        return;
    }

    // Get the current number of orders
    const response = await fetch('http://localhost:8088/orders');
    const orders = await response.json();
    const orderId = orders.length + 1;

    const order = {
        id: orderId,
        wheelsId: wheels,
        technologiesId: technologies,
        paintsId: paints,
        interiorsId: interiors,
    };

    try {
        const postResponse = await fetch('http://localhost:8088/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        if (postResponse.ok) {
            const newOrder = await postResponse.json();
            placeOrder(newOrder);
            resetState();
            resetDropdowns();
            document.dispatchEvent(new CustomEvent('stateChanged'));
        } else {
            console.error(postResponse.status);
        }
    } catch (error) {
        console.error('Failed to place order:', error);
    }
};

export const renderOrders = async () => {
    const ordersHtml = await Orders();
    const ordersElement = document.createElement('div');
    ordersElement.innerHTML = ordersHtml;

    const placeOrderButton = ordersElement.querySelector('#place-order');
    placeOrderButton.addEventListener('click', handlePlaceOrder);

    return ordersElement;
};
