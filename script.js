document.addEventListener("DOMContentLoaded", () => {
    let data;

    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            populateDropdown("stateDropdown", Object.keys(data.states));
        });

    function populateDropdown(id, options) {
        const dropdown = document.getElementById(id);
        dropdown.innerHTML = `<option value="">Select ${id.replace("Dropdown", "")}</option>`;
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });
    }

    document.getElementById("stateDropdown").addEventListener("change", function () {
        const state = this.value;
        if (state) {
            populateDropdown("companyDropdown", data.states[state].companies || []);
            populateDropdown("ahjDropdown", data.states[state].ahjs || []);
            populateDropdown("utilityDropdown", data.states[state].utilities || []);
        } else {
            ["companyDropdown", "ahjDropdown", "utilityDropdown"].forEach(id => populateDropdown(id, []));
        }
        updateChecklist();
    });

    document.querySelectorAll("select").forEach(dropdown => {
        dropdown.addEventListener("change", updateChecklist);
    });

    function updateChecklist() {
        const ahj = document.getElementById("ahjDropdown").value;
        const company = document.getElementById("companyDropdown").value;
        const checklistType = document.getElementById("checklistDropdown").value;
        const checklistContainer = document.getElementById("checklist");
        
        checklistContainer.innerHTML = "";

        if (checklistType && data.checklists[checklistType]) {
            data.checklists[checklistType].forEach(section => {
                const header = document.createElement("li");
                header.textContent = section.category;
                checklistContainer.appendChild(header);

                section.items.forEach(item => {
                    const li = document.createElement("li");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    li.appendChild(checkbox);
                    li.appendChild(document.createTextNode(` ${item}`));
                    checklistContainer.appendChild(li);
                });
            });
        }

        if (ahj && data.ahjNotes[ahj]) {
            Object.entries(data.ahjNotes[ahj]).forEach(([key, value]) => {
                const li = document.createElement("li");
                li.textContent = value;
                li.classList.add("yellow-item");
                checklistContainer.appendChild(li);
            });
        }

        if (company && data.companyNotes[company]) {
            const li = document.createElement("li");
            li.textContent = data.companyNotes[company];
            li.classList.add("green-item");
            checklistContainer.appendChild(li);
        }
    }

    document.getElementById("resetButton").addEventListener("click", () => {
        document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    });
});
