// scripts/State.js
let wheels = 0;
let technologies = 0;
let paints = 0;
let interiors = 0;
let orders = [];

export const getWheels = () => wheels;
export const getTechnologies = () => technologies;
export const getPaints = () => paints;
export const getInteriors = () => interiors;
export const getOrders = () => orders;

export const setWheels = (value) => {
    wheels = value;
    console.log(`Wheels selected: ${wheels}`);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setTechnologies = (value) => {
    technologies = value;
    console.log(`Technologies selected: ${technologies}`);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setPaints = (value) => {
    paints = value;
    console.log(`Paints selected: ${paints}`);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setInteriors = (value) => {
    interiors = value;
    console.log(`Interiors selected: ${interiors}`);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const placeOrder = (newOrder) => {
    orders.push(newOrder);
    console.log(`Order completed: ${JSON.stringify(newOrder)}`);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const resetState = () => {
    wheels = 0;
    technologies = 0;
    paints = 0;
    interiors = 0;
    console.log('State reset');
};