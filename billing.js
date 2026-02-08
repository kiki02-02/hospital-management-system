// Toggle Menu
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// Hover Effect
let list = document.querySelectorAll('.navigation li');
function activeLink() {
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) => item.addEventListener('mouseover', activeLink));

// ============================================
// BILLING LOGIC
// ============================================

const initialPatients = [
    { name: "David John", age: 60, problem: "Diabetes" },
    { name: "Sara Khan", age: 22, problem: "Typhoid" },
    { name: "Priya Singh", age: 28, problem: "Fracture" },
    { name: "Ravi Kumar", age: 34, problem: "Fever" }
];

// Load Patients from Storage created in app.js
let patients = JSON.parse(localStorage.getItem('hdms_patients')) || initialPatients;

// Populate Dropdown
function loadPatientDropdown() {
    const select = document.getElementById('bPatient');
    if (!select) return;

    patients.forEach(pat => {
        const option = document.createElement('option');
        option.value = pat.name;
        option.text = pat.name + " (" + pat.problem + ")";
        select.add(option);
    });
}

// Calculate Total in Input Form
function calculateTotal() {
    const consult = parseFloat(document.getElementById('bConsult').value) || 0;
    const medicine = parseFloat(document.getElementById('bMedicine').value) || 0;
    const lab = parseFloat(document.getElementById('bLab').value) || 0;
    const room = parseFloat(document.getElementById('bRoom').value) || 0;

    const total = consult + medicine + lab + room;
    document.getElementById('bTotal').value = total.toFixed(2);
}

// Generate Invoice Function
window.generateBill = function (e) {
    e.preventDefault();

    const patientName = document.getElementById('bPatient').value;
    if (!patientName) {
        alert("Please select a patient!");
        return;
    }

    const consult = document.getElementById('bConsult').value;
    const medicine = document.getElementById('bMedicine').value;
    const lab = document.getElementById('bLab').value;
    const room = document.getElementById('bRoom').value;
    const total = document.getElementById('bTotal').value;

    // Show Preview
    document.getElementById('invoicePreview').style.display = 'block';

    // Populate Data into Preview
    document.getElementById('invPatient').innerText = patientName;
    document.getElementById('invNo').innerText = "INV-" + Math.floor(Math.random() * 10000);
    document.getElementById('invDate').innerText = new Date().toLocaleDateString('en-GB');

    document.getElementById('pConsult').innerText = consult;
    document.getElementById('pMedicine').innerText = medicine;
    document.getElementById('pLab').innerText = lab;
    document.getElementById('pRoom').innerText = room;
    document.getElementById('pTotal').innerText = total;
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadPatientDropdown();
});
