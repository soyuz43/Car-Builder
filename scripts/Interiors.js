// scripts/Interiors.js
const Interiors = async () => {
    console.log('Fetching interior options...');
    const response = await fetch('http://localhost:8088/options');
    const data = await response.json();
    console.log('Interior options fetched:', data);

    const interiorsOptions = data.filter(option => option.type === 'interior');

    const html = `
        <select id="interiors">
            <option value="0">Select interior...</option>
            ${interiorsOptions.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
    `;

    console.log('Interiors HTML generated:', html);
    return html;
};

export default Interiors;
