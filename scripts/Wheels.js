// scripts/Wheels.js
export const Wheels = async () => {
    const response = await fetch('http://localhost:8088/options');
    const data = await response.json();
    const wheelsOptions = data.filter(option => option.type === 'wheels');

    const html = `
        <select id="wheels">
            <option value="0">Select wheels...</option>
            ${wheelsOptions.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
    `;

    return html;
};
