document.addEventListener("DOMContentLoaded", async function () {
    const stateDropdown = document.getElementById("stateDropdown");
    const companyDropdown = document.getElementById("companyDropdown");
    const ahjDropdown = document.getElementById("ahjDropdown");
    const utilityDropdown = document.getElementById("utilityDropdown");
    const checklistDropdown = document.getElementById("checklistDropdown");
    const checklistContainer = document.getElementById("checklistItems");
    const resetButton = document.getElementById("resetButton");

    let data = await fetch("data.json").then(res => res.json());

    // Populate states dropdown
    Object.keys(data.states).forEach(state => {
        let option = new Option(state, state);
        stateDropdown.add(option);
    });

    function updateDropdown(dropdown, options) {
        dropdown.innerHTML = '<option value="">Select</option>';
        options.forEach(opt => dropdown.add(new Option(opt, opt)));
    }

    stateDropdown.addEventListener("change", function () {
        let selectedState = this.value;
        let stateData = data.states[selectedState] || { companies: [], ahjs: [], utilities: [] };
        updateDropdown(companyDropdown, stateData.companies);
        updateDropdown(ahjDropdown, stateData.ahjs);
        updateDropdown(utilityDropdown, stateData.utilities);
    });

    function updateChecklist() {
        checklistContainer.innerHTML = "";
        let checklistType = checklistDropdown.value;
        let selectedAHJ = ahjDropdown.value;
        let selectedCompany = companyDropdown.value;

        if (checklistType === "ftd") {
            Object.entries(data.ftdChecklist).forEach(([section, items]) => {
                let sectionEl = document.createElement("li");
                sectionEl.textContent = section + ":";
                checklistContainer.appendChild(sectionEl);
                items.forEach(item => {
                    let itemEl = document.createElement("li");
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    itemEl.appendChild(checkbox);
                    itemEl.append(" " + item);
                    checklistContainer.appendChild(itemEl);
                });
            });
        }

        if (selectedAHJ && data.ahjData[selectedAHJ]) {
            Object.entries(data.ahjData[selectedAHJ]).forEach(([section, text]) => {
                let itemEl = document.createElement("li");
                itemEl.innerHTML = `<span class="yellow-text">${text}</span>`;
                checklistContainer.appendChild(itemEl);
            });
        }

        if (selectedCompany && data.companyData[selectedCompany]) {
            let itemEl = document.createElement("li");
            itemEl.innerHTML = `<span class="green-text">${data.companyData[selectedCompany]}</span>`;
            checklistContainer.appendChild(itemEl);
        }
    }

    checklistDropdown.addEventListener("change", updateChecklist);
    ahjDropdown.addEventListener("change", updateChecklist);
    companyDropdown.addEventListener("change", updateChecklist);

    resetButton.addEventListener("click", () => {
        checklistContainer.innerHTML = "";
    });
});
