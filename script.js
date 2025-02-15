document.addEventListener("DOMContentLoaded", function() {
    const stateDropdown = document.getElementById("stateDropdown");
    const companyDropdown = document.getElementById("companyDropdown");
    const ahjDropdown = document.getElementById("ahjDropdown");
    const utilityDropdown = document.getElementById("utilityDropdown");
    const inverterDropdown = document.getElementById("inverterDropdown");
    const batteryDropdown = document.getElementById("batteryDropdown");
    const checklistDropdown = document.getElementById("checklistDropdown");
    const checklistContainer = document.getElementById("checklistContainer");
    const resetButton = document.getElementById("resetButton");

    let data;

    fetch("data.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            populateDropdown(stateDropdown, Object.keys(data.states));
        });

    function populateDropdown(dropdown, items) {
        dropdown.innerHTML = '<option value="">Select</option>';
        items.forEach(item => {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    }

    stateDropdown.addEventListener("change", function() {
        let selectedState = stateDropdown.value;
        if (selectedState) {
            populateDropdown(companyDropdown, data.states[selectedState].companies || []);
            populateDropdown(ahjDropdown, data.states[selectedState].ahjs || []);
            populateDropdown(utilityDropdown, data.states[selectedState].utilities || []);
        }
    });

    ahjDropdown.addEventListener("change", function() {
        let selectedAhj = ahjDropdown.value;
        checklistContainer.innerHTML = "";
        if (selectedAhj && data.ahjs[selectedAhj]) {
            let ahjNotes = data.ahjs[selectedAhj];
            Object.keys(ahjNotes).forEach(section => {
                let note = document.createElement("p");
                note.style.color = "yellow";
                note.innerHTML = `<strong>${section}:</strong> ${ahjNotes[section]}`;
                checklistContainer.appendChild(note);
            });
        }
    });

    companyDropdown.addEventListener("change", function() {
        let selectedCompany = companyDropdown.value;
        if (selectedCompany && data.companies[selectedCompany]) {
            let note = document.createElement("p");
            note.style.color = "green";
            note.innerHTML = `<strong>Company Note:</strong> ${data.companies[selectedCompany]}`;
            checklistContainer.appendChild(note);
        }
    });

    checklistDropdown.addEventListener("change", function() {
        checklistContainer.innerHTML = "";
        let checklistType = checklistDropdown.value;
        if (checklistType && data.checklists[checklistType]) {
            data.checklists[checklistType].forEach(item => {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = item;
                let label = document.createElement("label");
                label.htmlFor = item;
                label.textContent = item;
                checklistContainer.appendChild(checkbox);
                checklistContainer.appendChild(label);
                checklistContainer.appendChild(document.createElement("br"));
            });
        }
    });

    resetButton.addEventListener("click", function() {
        document.querySelectorAll("#checklistContainer input[type='checkbox']").forEach(checkbox => {
            checkbox.checked = false;
        });
    });
});
