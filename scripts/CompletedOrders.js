// scripts/CompletedOrders.js
import { getOrders } from './State.js';

// Retrieve options from the database
const getOptions = async () => {
  const response = await fetch('http://localhost:8088/options');
  const options = await response.json();
  const optionsObject = {};

  options.forEach((option) => {
    optionsObject[option.id] = option;
  });

  return optionsObject;
};

export const CompletedOrders = async () => {
  // Retrieve orders from the database
  const response = await fetch('http://localhost:8088/orders');
  const ordersFromDatabase = await response.json();

  // Retrieve options from the database
  const options = await getOptions();

  const html = ordersFromDatabase.map((order) => {
    // Calculate the total price for the order
    const wheelsPrice = options[order.wheelsId] ? options[order.wheelsId].price : 0;
    const technologiesPrice = options[order.technologiesId] ? options[order.technologiesId].price : 0;
    const paintsPrice = options[order.paintsId] ? options[order.paintsId].price : 0;
    const interiorsPrice = options[order.interiorsId] ? options[order.interiorsId].price : 0;
    const totalPrice = wheelsPrice + technologiesPrice + paintsPrice + interiorsPrice;

    return `
      <div>
        <h2>Order #${order.id}</h2>
        <p>Wheels: ${options[order.wheelsId] ? options[order.wheelsId].name : 'Unknown'}</p>
        <p>Technologies: ${options[order.technologiesId] ? options[order.technologiesId].name : 'Unknown'}</p>
        <p>Paints: ${options[order.paintsId] ? options[order.paintsId].name : 'Unknown'}</p>
        <p>Interiors: ${options[order.interiorsId] ? options[order.interiorsId].name : 'Unknown'}</p>
        <p>Total Price: $${totalPrice}</p>
      </div>
    `;
  }).join('');

  return html;
};