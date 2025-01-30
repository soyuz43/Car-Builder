// scripts/Technologies.js
const Technologies = async () => {
    const response = await fetch('http://localhost:8088/options');
    const data = await response.json();
    const technologiesOptions = data.filter(option => option.type === 'technology');

    const html = `
        <select id="technologies">
            <option value="0">Select technology...</option>
            ${technologiesOptions.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
    `;

    return html;
};

export default Technologies;