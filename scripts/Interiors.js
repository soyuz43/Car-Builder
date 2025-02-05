// scripts/Interiors.js
export const Interiors = async () => {  
    const response = await fetch('http://localhost:8088/options');
    const data = await response.json();
    const interiorsOptions = data.filter(option => option.type === 'interior');

    const html = `
        <select id="interiors">
            <option value="0">Select interior...</option>
            ${interiorsOptions.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
    `;
    return html;
};
