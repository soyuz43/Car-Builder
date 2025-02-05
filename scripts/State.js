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
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setTechnologies = (value) => {
    technologies = value;
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setPaints = (value) => {
    paints = value;
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const setInteriors = (value) => {
    interiors = value;
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const placeOrder = (newOrder) => {
    orders.push(newOrder);
    document.dispatchEvent(new CustomEvent('stateChanged'));
};

export const resetState = () => {
    wheels = 0;
    technologies = 0;
    paints = 0;
    interiors = 0;
};
