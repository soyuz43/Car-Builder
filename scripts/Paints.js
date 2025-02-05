// scripts/Paints.js
export const Paints = async () => {
    const response = await fetch('http://localhost:8088/options');
    const data = await response.json();
    const paintsOptions = data.filter(option => option.type === 'paintColor');

    const html = `
        <select id="paints">
            <option value="0">Select paint...</option>
            ${paintsOptions.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
    `;

    return html;
};

