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
    
  // Check if any of the options are missing
  if (wheelsId === "0" || technologiesId === "0" || paintsId === "0" || interiorsId === "0") {
    if (wheelsId === "0") {
      window.alert("The wheels selection is missing");
    }
    if (technologiesId === "0") {
      window.alert("The technologies selection is missing");
    }
    if (paintsId === "0") {
      window.alert("The paints selection is missing");
    }
    if (interiorsId === "0") {
      window.alert("The interiors selection is missing");
    }
    return;
  }

    const order = {
        wheelsId: getWheels(),
        technologiesId: getTechnologies(),
        paintsId: getPaints(),
        interiorsId: getInteriors(),
    };
    try {
        const response = await fetch('http://localhost:8088/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        if (response.ok) {
            const newOrder = await response.json();
            placeOrder(newOrder);
            resetState();
            resetDropdowns();
            document.dispatchEvent(new CustomEvent('stateChanged'));
        } else {
            console.error(response.status);
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
