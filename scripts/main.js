// scripts/main.js
import { setInteriors, setPaints, setTechnologies, setWheels  } from './State.js';
import Wheels from './Wheels.js';
import Technologies from './Technologies.js';
import Paints from './Paints.js';
import Interiors from './Interiors.js';
import { renderOrders, handlePlaceOrder } from './Orders.js';
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
            <section class="wheels">${wheelsHtml}</section>
            <section class="technologies">${technologiesHtml}</section>
            <section class="paints">${paintsHtml}</section>
            <section class="interiors">${interiorsHtml}</section>
        </article>
        <article class="orders">
            ${ordersElement.outerHTML}
        </article>
        <article class="completed-orders" id="completed-orders">
            ${completedOrdersHtml}
        </article>
    `;

    console.log('Main page HTML generated.');
    return html;
};

const addOrderButtonListener = () => {
  console.log("Adding event listener to place order button...");
  document.getElementById("place-order")?.addEventListener("click", async () => {
      console.log("🛒 Place order button clicked!");
      await handlePlaceOrder();
  });
};


const addSelectionEventListeners = () => {
  console.log("Adding event listeners to selection dropdowns...");
  
  document.getElementById("wheels")?.addEventListener("change", (event) => {
      console.log("Wheels changed:", event.target.value);
      setWheels(parseInt(event.target.value));
  });

  document.getElementById("technologies")?.addEventListener("change", (event) => {
      console.log("Technologies changed:", event.target.value);
      setTechnologies(parseInt(event.target.value));
  });

  document.getElementById("paints")?.addEventListener("change", (event) => {
      console.log("Paints changed:", event.target.value);
      setPaints(parseInt(event.target.value));
  });

  document.getElementById("interiors")?.addEventListener("change", (event) => {
      console.log("Interiors changed:", event.target.value);
      setInteriors(parseInt(event.target.value));
  });

  console.log("Event listeners added.");
};

const main = async () => {
  console.log("Main function started...");
  const html = await render();
  document.getElementById("app").innerHTML = html;
  console.log("DOM updated with main content.");

  addSelectionEventListeners();
  addOrderButtonListener();

  document.addEventListener("stateChanged", async () => {
      console.log("State changed event received. Re-rendering completed orders...");
      const completedOrdersHtml = await CompletedOrders();
      document.getElementById("completed-orders").innerHTML = completedOrdersHtml;
      console.log("Completed orders section updated.");
  });
};

main();
