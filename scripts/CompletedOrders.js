// scripts/CompletedOrders.js
import { getOrders } from './State.js';

const CompletedOrders = async () => {
    console.log('CompletedOrders function started...');
    const orders = await getOrders();
    console.log(`Orders fetched from state: ${JSON.stringify(orders)}`);

    const html = orders.map((order) => {
        return `
            <div>
                <h2>Order #${order.id}</h2>
                <p>Wheels: ${order.wheelsId}</p>
                <p>Technologies: ${order.technologiesId}</p>
                <p>Paints: ${order.paintsId}</p>
                <p>Interiors: ${order.interiorsId}</p>
            </div>
        `;
    }).join('');

    console.log('HTML generated for completed orders:', html);
    return html;
};

export default CompletedOrders;
