const stateDropdown = document.getElementById('state');
const companyDropdown = document.getElementById('company');
const ahjDropdown = document.getElementById('ahj');
const utilityDropdown = document.getElementById('utility');
const inverterDropdown = document.getElementById('inverter');
const batteryDropdown = document.getElementById('battery');
const checklistContent = document.getElementById('checklistContent');
const resetButton = document.getElementById('resetButton');
const checklistDropdown = document.getElementById('checklist');

let data = {};

fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
    });

// Function to update dropdowns based on state
function updateDropdowns() {
    const selectedState = stateDropdown.value;

    if (selectedState && data[selectedState]) {
        // Update Company, AHJ, Utility, Inverter, Battery dropdowns based on the state
        const companies = data[selectedState].companies;
        const ahjs = data[selectedState].ahj;
        const utilities = data[selectedState].utility;
        const inverters = data[selectedState].inverter;
        const batteries = data[selectedState].battery;

        updateOptions(companyDropdown, companies);
        updateOptions(ahjDropdown, ahjs);
        updateOptions(utilityDropdown, utilities);
        updateOptions(inverterDropdown, inverters);
        updateOptions(batteryDropdown, batteries);
    }
}

// Function to update dropdown options
function updateOptions(dropdown, options) {
    dropdown.innerHTML = `<option value="">Select ${dropdown.id}</option>`;
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}

// Function to display checklist content
function displayChecklist() {
    const selectedChecklist = checklistDropdown.value;
    const selectedCompany = companyDropdown.value;
    const selectedAHJ = ahjDropdown.value;
    const selectedState = stateDropdown.value;

    let checklistHTML = '';

    if (selectedChecklist === 'FTD CHECKLIST') {
        checklistHTML += generateChecklistSection('COMPANY BEST PRACTICES:', [
            'MODEL SPACE:',
            'FILL OUT DWG PROPS UTC',
            'AZIMUTH UTC',
            'DRAW HOUSE',
            'PROPERTY LINE',
            'FENCE',
            'DRIVEWAY'
        ]);

        checklistHTML += generateChecklistSection('PV0:', ['SELECT CORRECT PROJECT DATA DROPDOWN UTC']);
        checklistHTML += generateChecklistSection('PV1:', ['UPDATE SITE NOTES']);
        checklistHTML += generateChecklistSection('PV2:', ['LEGEND']);
        checklistHTML += generateChecklistSection('PV2A:', ['ADD NO DWELLING WINDOWS']);
        checklistHTML += generateChecklistSection('PV3:', ['ATTACH THE CORRECT ATTACHMENT DWG']);
        checklistHTML += generateChecklistSection('PV4:', ['WIRE TABLE']);
        checklistHTML += generateChecklistSection('PV5:', ['LABEL 10']);
        checklistHTML += generateChecklistSection('POST CAD:', ['UPDATE SHEET NAME']);
    }

    if (selectedState && selectedCompany && selectedAHJ) {
        const ahjNotes = data[selectedState].notes[selectedAHJ];
        if (ahjNotes) {
            if (ahjNotes.pv4) {
                checklistHTML += generateChecklistSection('PV4:', [ahjNotes.pv4]);
            }
            if (ahjNotes.pv3) {
                checklistHTML += generateChecklistSection('PV3:', [ahjNotes.pv3]);
            }
        }
    }

    checklistContent.innerHTML = checklistHTML;
}

// Function to generate checklist section HTML
function generateChecklistSection(title, items) {
    return `
        <div class="checklist-section">
            <h2>${title}</h2>
            <ul>
                ${items.map(item => `<li><input type="checkbox"> ${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Reset button functionality
resetButton.addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
});

// Event listeners
stateDropdown.addEventListener('change', () => {
    updateDropdowns();
    displayChecklist();
});
checklistDropdown.addEventListener('change', displayChecklist);
companyDropdown.addEventListener('change', displayChecklist);
ahjDropdown.addEventListener('change', displayChecklist);

