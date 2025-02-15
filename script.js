document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            window.data = data;
            populateDropdowns();
            document.getElementById("checklistType").addEventListener("change", updateChecklist);
            document.getElementById("state").addEventListener("change", filterDropdowns);
            document.getElementById("ahj").addEventListener("change", updateAHJChecklist);
        });

    function populateDropdowns() {
        const stateDropdown = document.getElementById("state");
        Object.keys(window.data.states).forEach(state => {
            let option = new Option(state, state);
            stateDropdown.add(option);
        });
    }

    function filterDropdowns() {
        const state = document.getElementById("state").value;
        const companyDropdown = document.getElementById("company");
        const ahjDropdown = document.getElementById("ahj");
        const utilityDropdown = document.getElementById("utility");

        [companyDropdown, ahjDropdown, utilityDropdown].forEach(dropdown => dropdown.innerHTML = "");

        if (state && window.data.states[state]) {
            window.data.states[state].companies.forEach(company => {
                let option = new Option(company, company);
                companyDropdown.add(option);
            });

            window.data.states[state].ahjs.forEach(ahj => {
                let option = new Option(ahj, ahj);
                ahjDropdown.add(option);
            });

            window.data.states[state].utilities.forEach(utility => {
                let option = new Option(utility, utility);
                utilityDropdown.add(option);
            });
        }
    }

    function updateChecklist() {
        const checklistType = document.getElementById("checklistType").value;
        const checklistItems = document.getElementById("checklistItems");
        checklistItems.innerHTML = "";

        if (checklistType === "ftd") {
            Object.entries(window.data.ftdChecklist).forEach(([section, items]) => {
                let sectionTitle = document.createElement("h4");
                sectionTitle.textContent = section;
                checklistItems.appendChild(sectionTitle);

                items.forEach(item => {
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = item;
                    let label = document.createElement("label");
                    label.htmlFor = item;
                    label.textContent = item;
                    checklistItems.appendChild(checkbox);
                    checklistItems.appendChild(label);
                    checklistItems.appendChild(document.createElement("br"));
                });
            });
        }
    }

    function updateAHJChecklist() {
        const ahj = document.getElementById("ahj").value;
        const checklistItems = document.getElementById("checklistItems");

        if (window.data.ahjChecklist[ahj]) {
            Object.entries(window.data.ahjChecklist[ahj]).forEach(([pv, note]) => {
                let existingCheckbox = document.getElementById(pv);
                if (!existingCheckbox) {
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = pv;
                    let label = document.createElement("label");
                    label.htmlFor = pv;
                    label.textContent = `${pv}: ${note}`;
                    checklistItems.appendChild(checkbox);
                    checklistItems.appendChild(label);
                    checklistItems.appendChild(document.createElement("br"));
                }
            });
        }
    }

    window.resetChecklist = function() {
        document.querySelectorAll("#checklistItems input[type=checkbox]").forEach(checkbox => {
            checkbox.checked = false;
        });
    };
});
