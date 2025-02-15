document.addEventListener("DOMContentLoaded", () => {
    const checklistData = {
        "COMPANY BEST PRACTICES": [],
        "MODEL SPACE": [
            "FILL OUT DWG PROPS UTC", "AZIMUTH UTC", "DRAW HOUSE", "PROPERTY LINE", "FENCE", "DRIVEWAY",
            "PROPERTY DIMENSION", "FIRE SETBACKS", "RAFTERS", "MODULES", "ATTACHMENTS",
            "USE COUNT ATTACHMENTS UTC", "EQUIPMENT ICONS", "CONDUIT", "AHJ NOTES"
        ],
        "PV0": ["SELECT CORRECT PROJECT DATA DROPDOWN UTC", "AHJ NOTES"],
        "PV1": ["UPDATE SITE NOTES", "BLOWUP VIEW", "AHJ NOTES"],
        "PV2": ["LEGEND", "ROOF CALLOUT", "AHJ NOTES"],
        "PVA": ["ADD NO DWELLING WINDOWS AND DOORS NOTE IF NEEDED"],
        "PV3": ["ATTACH THE CORRECT ATTACHMENT DWG", "AHJ NOTES"],
        "PV4": ["WIRE TABLE", "GROUNDING LABEL", "AHJ NOTES"],
        "PV5": ["LABEL 10", "LABEL 13", "AHJ NOTES"],
        "POST CAD": ["UPDATE SHEET NAME", "AHJ NOTES", "SPEC SHEETS"]
    };

    let dropdownData = {};

    async function loadDropdowns() {
        try {
            const response = await fetch("data.json");
            dropdownData = await response.json();

            populateDropdown("company", dropdownData.company);
            populateDropdown("state", dropdownData.state);
            populateDropdown("ahj", Object.keys(dropdownData.ahj));
            populateDropdown("utility", dropdownData.utility);
            populateDropdown("inverter", dropdownData.inverter);
            populateDropdown("battery", dropdownData.battery);

            renderChecklist(checklistData);
        } catch (error) {
            console.error("Error loading dropdown data:", error);
        }
    }

    function populateDropdown(id, options) {
        const dropdown = document.getElementById(id);
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });
    }

    function renderChecklist(data) {
        const checklistContainer = document.getElementById("checklist");
        checklistContainer.innerHTML = "";

        Object.keys(data).forEach(category => {
            const categoryTitle = document.createElement("h3");
            categoryTitle.textContent = category;
            checklistContainer.appendChild(categoryTitle);

            const list = document.createElement("ul");

            data[category].forEach(item => {
                const listItem = document.createElement("li");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = item;

                const label = document.createElement("label");
                label.htmlFor = item;
                label.textContent = item;

                listItem.appendChild(checkbox);
                listItem.appendChild(label);
                list.appendChild(listItem);
            });

            checklistContainer.appendChild(list);
        });
    }

    document.getElementById("ahj").addEventListener("change", function () {
        const selectedAHJ = this.value;

        if (selectedAHJ in dropdownData.ahj) {
            const modifiedChecklist = JSON.parse(JSON.stringify(checklistData));

            Object.keys(dropdownData.ahj[selectedAHJ]).forEach(category => {
                modifiedChecklist[category] = modifiedChecklist[category].concat(dropdownData.ahj[selectedAHJ][category]);
            });

            renderChecklist(modifiedChecklist);
        }
    });

    document.getElementById("reset").addEventListener("click", () => {
        document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
        renderChecklist(checklistData);
    });

    loadDropdowns();
});
