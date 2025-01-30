// scripts/main.js
import { getOrders } from './State.js';
import Wheels from './Wheels.js';
import Technologies from './Technologies.js';
import Paints from './Paints.js';
import Interiors from './Interiors.js';
import { renderOrders } from './Orders.js';
import CompletedOrders from './CompletedOrders.js';

const render = async () => {
  console.log('Rendering main page...');
  const wheelsHtml = await Wheels();
  const technologiesHtml = await Technologies();
  const paintsHtml = await Paints();
  const interiorsHtml = await Interiors();
  const ordersElement = await renderOrders();
  const completedOrdersHtml = await CompletedOrders();

  console.log('Rendering completed. Generating HTML...');
  const html = `
    <h1>Cars 'R Us</h1>
    <article class="options">
      <section class="wheels">
        ${wheelsHtml}
      </section>
      <section class="technologies">
        ${technologiesHtml}
      </section>
      <section class="paints">
        ${paintsHtml}
      </section>
      <section class="interiors">
        ${interiorsHtml}
      </section>
    </article>
    <article class="orders">
      ${ordersElement.outerHTML}
    </article>
    <article class="completed-orders" id="completed-orders">
      ${completedOrdersHtml}
    </article>
  `;

  console.log('HTML generated. Returning...');
  return html;
};

const main = async () => {
  console.log('Main function started...');
  const html = await render();
  console.log('Rendering complete. Updating DOM...');
  document.getElementById('app').innerHTML = html;

  console.log('DOM updated. Adding event listener...');
  document.addEventListener('stateChanged', async () => {
    console.log('State changed event received...');
    const completedOrdersHtml = await CompletedOrders();
    console.log('Completed orders HTML generated. Updating DOM...');
    document.getElementById('completed-orders').innerHTML = completedOrdersHtml;
    console.log('DOM updated.');
  });
};

main();