// scripts/main.js
import { setInteriors, setPaints, setTechnologies, setWheels  } from './State.js';
import { Wheels } from './Wheels.js';
import { Technologies } from './Technologies.js';
import { Paints } from './Paints.js';
import { Interiors } from './Interiors.js';
import { renderOrders, handlePlaceOrder } from './Orders.js';
import { CompletedOrders } from './CompletedOrders.js';

const render = async () => {
    const wheelsHtml = await Wheels();
    const technologiesHtml = await Technologies();
    const paintsHtml = await Paints();
    const interiorsHtml = await Interiors();
    const ordersElement = await renderOrders();
    const completedOrdersHtml = await CompletedOrders();

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

    return html;
};

const addOrderButtonListener = () => {
  document.getElementById("place-order")?.addEventListener("click", async () => {
      await handlePlaceOrder();
  });
};

const resetDropdowns = () => {
  document.getElementById("wheels").value = "";
  document.getElementById("technologies").value = "";
  document.getElementById("paints").value = "";
  document.getElementById("interiors").value = "";
};

const addSelectionEventListeners = () => {
  
  document.getElementById("wheels")?.addEventListener("change", (event) => {
      setWheels(parseInt(event.target.value));
  });

  document.getElementById("technologies")?.addEventListener("change", (event) => {
      setTechnologies(parseInt(event.target.value));
  });

  document.getElementById("paints")?.addEventListener("change", (event) => {
      setPaints(parseInt(event.target.value));
  });

  document.getElementById("interiors")?.addEventListener("change", (event) => {
      setInteriors(parseInt(event.target.value));
  });

};

const main = async () => {
  const html = await render();
  document.getElementById("app").innerHTML = html;

  addSelectionEventListeners();
  addOrderButtonListener();

  document.addEventListener("stateChanged", async () => {
      const completedOrdersHtml = await CompletedOrders();
      document.getElementById("completed-orders").innerHTML = completedOrdersHtml;
  });
};

main();
