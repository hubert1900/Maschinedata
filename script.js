let currentMachineIndex = 0;
let data;

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    themeStylesheet.href = savedTheme === 'dark' ? 'dark-theme.css' : 'style.css';

    updateToggleCirclePosition();
    initializeFilters();
    fetchMachineData();
    setupNavigationButtons();

    // Event Listener for the "Alle Maschinen auswählen" button
    const selectAllButton = document.getElementById('selectAllButton');
    selectAllButton.addEventListener('click', selectAllMachines);
});

function toggleTheme() {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const currentTheme = themeStylesheet.href;
    themeStylesheet.href = currentTheme.includes('style.css') ? 'dark-theme.css' : 'style.css';
    localStorage.setItem('theme', currentTheme.includes('style.css') ? 'dark' : '');

    updateToggleCirclePosition();
}

function updateToggleCirclePosition() {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const currentTheme = themeStylesheet.href;
    const toggleCircle = document.querySelector('.toggle-circle');
    toggleCircle.style.transform = currentTheme.includes('style.css') ? 'translateX(0)' : 'translateX(30px)';
}

function fetchMachineData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://atp.fhstp.ac.at/machines', true);
    xhr.onload = function () {
        if (this.status === 200) {
            data = JSON.parse(this.responseText);
            displayCurrentMachine();
        } else {
            console.error('Error fetching data');
        }
    };
    xhr.send();
}

function displayCurrentMachine() {
    var container = document.getElementById('data-container');
    container.innerHTML = '';

    const machineKey = Object.keys(data)[currentMachineIndex];
    const machineInfo = data[machineKey];
    var machineElement = createMachineElement(machineKey, machineInfo);
    container.appendChild(machineElement);
}

function createMachineElement(machine, machineInfo) {
    var machineContainer = document.createElement('div');
    machineContainer.id = `${machine.toLowerCase()}-container`;
    machineContainer.className = `machine-container ${machine.toLowerCase()}-color`;

    var machineHeader = document.createElement('h3');
    machineHeader.className = 'machine-header';
    machineHeader.textContent = ` ${machine}`;

    var identifikation = createPropertyElement('Identifikation:', machineInfo.identifikation);
    var temperatur = createPropertyElement('Temperatur:', machineInfo.temperatur);
    var durchgangigeLaufzeit = createPropertyElement('Durchgängige Laufzeit:', machineInfo.durchgängigeLaufzeit);

    var motorContainer = document.createElement('div');
    motorContainer.className = 'motor-container';

    var aktuelleLeistung = createPropertyElement('Aktuelle Leistung:', machineInfo.Motor.aktuelleLeistung);
    var betriebsminutenGesamt = createPropertyElement('Betriebsminuten Gesamt:', machineInfo.Motor.betriebsminutenGesamt);
    var letzteWartung = createPropertyElement('Letzte Wartung:', machineInfo.Motor.letzteWartung);

    motorContainer.appendChild(aktuelleLeistung);
    motorContainer.appendChild(betriebsminutenGesamt);
    motorContainer.appendChild(letzteWartung);

    machineContainer.appendChild(machineHeader);
    machineContainer.appendChild(identifikation);
    machineContainer.appendChild(temperatur);
    machineContainer.appendChild(durchgangigeLaufzeit);
    machineContainer.appendChild(motorContainer);

    return machineContainer;
}

function createPropertyElement(label, value) {
    var propertyContainer = document.createElement('div');
    propertyContainer.className = 'property-container';

    var labelElement = document.createElement('span');
    labelElement.className = 'property-label';
    labelElement.textContent = label;

    var valueElement = document.createElement('span');
    valueElement.className = 'property-value';
    valueElement.textContent = value;

    propertyContainer.appendChild(labelElement);
    propertyContainer.appendChild(valueElement);

    return propertyContainer;
}

function initializeFilters() {
    const filterSelect = document.getElementById('filter-select');
    const filterButton = document.getElementById('filter-button');

    filterButton.addEventListener('click', function () {
        const selectedMachine = filterSelect.value;
        filterMachineData(selectedMachine);
    });
}


// ...

function selectMachine(index) {
    currentMachineIndex = index;
    displayCurrentMachine();
}

function selectAllMachines() {
    const machineSelectors = document.querySelectorAll('.machine-selector');

    for (let i = 0; i < machineSelectors.length; i++) {
        machineSelectors[i].checked = true; // Check all checkboxes
        selectMachine(i); // Call selectMachine for each selected machine
    }
    // Update data for the last selected machine (optional)
    displayCurrentMachine();
}

