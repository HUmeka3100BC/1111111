document.addEventListener('DOMContentLoaded', () => {
    const checklistDropdown = document.getElementById('checklist');
    const companyDropdown = document.getElementById('company');
    const stateDropdown = document.getElementById('state');
    const ahjDropdown = document.getElementById('ahj');
    const utilityDropdown = document.getElementById('utility');
    const inverterDropdown = document.getElementById('inverter');
    const batteryDropdown = document.getElementById('battery');
    const checklistItemsDiv = document.getElementById('checklistItems');
    const resetButton = document.getElementById('resetButton');

    let data = {};

    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            populateDropdowns();
        });

    function populateDropdowns() {
        // Populate state dropdown
        for (const state of Object.keys(data)) {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateDropdown.appendChild(option);
        }

        stateDropdown.addEventListener('change', () => {
            const selectedState = stateDropdown.value;
            populateCompanyDropdown(selectedState);
        });

        companyDropdown.addEventListener('change', () => {
            const selectedCompany = companyDropdown.value;
            populateAHJDropdown(selectedCompany);
        });

        ahjDropdown.addEventListener('change', () => {
            const selectedAHJ = ahjDropdown.value;
            updateChecklistItems(selectedAHJ);
        });

        checklistDropdown.addEventListener('change', () => {
            updateChecklistItems(ahjDropdown.value);
        });

        resetButton.addEventListener('click', resetCheckboxes);
    }

    function populateCompanyDropdown(state) {
        companyDropdown.innerHTML = '<option value="">Select Company</option>';
        const companies = data[state].companies;
        for (const company of companies) {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            companyDropdown.appendChild(option);
        }
        ahjDropdown.innerHTML = '<option value="">Select AHJ</option>';
        utilityDropdown.innerHTML = '<option value="">Select Utility</option>';
    }

    function populateAHJDropdown(company) {
        ahjDropdown.innerHTML = '<option value="">Select AHJ</option>';
        const ahjs = data[stateDropdown
