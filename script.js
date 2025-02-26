let jsonData;

// Load JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    populateDropdowns();
  });

function populateDropdowns() {
  let stateDropdown = document.getElementById('state');
  for (let state in jsonData.States) {
    let option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
  }
}

function updateDropdown(category) {
  let state = document.getElementById('state').value;
  let dropdown = document.getElementById(category);
  dropdown.innerHTML = '<option value="">Select</option>'; // Reset

  if (state && jsonData.States[state][category]) {
    jsonData.States[state][category].forEach(item => {
      let option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      dropdown.appendChild(option);
    });
  }
}

function showSentence(category) {
  let selection = document.getElementById(category).value;
  let sentenceDiv = document.getElementById('sentenceDisplay');

  sentenceDiv.innerHTML = ''; // Clear previous sentences

  if (selection && jsonData.Sentences[selection]) {
    for (let key in jsonData.Sentences[selection]) {
      let sentence = document.createElement('p');
      sentence.innerHTML = `<strong>${key}:</strong> ${jsonData.Sentences[selection][key]}`;
      sentenceDiv.appendChild(sentence);
    }
  }
}
