// Menu Toggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// add hovered class in selected list item
let list = document.querySelectorAll('.navigation li');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));

// ============================================
// PATIENT MANAGEMENT LOGIC (Local Storage)
// ============================================

const initialPatients = [
    { name: "David John", age: 60, problem: "Diabetes", doctor: "Dr. Rao", status: "delivered" },
    { name: "Sara Khan", age: 22, problem: "Typhoid", doctor: "Dr. Gupta", status: "inProgress" },
    { name: "Amit Patel", age: 45, problem: "Checkup", doctor: "Dr. Mehta", status: "return" },
    { name: "Priya Singh", age: 28, problem: "Fracture", doctor: "Dr. Reddy", status: "pending" },
    { name: "Ravi Kumar", age: 34, problem: "Fever", doctor: "Dr. Sharma", status: "delivered" }
];

// Load from LocalStorage
let patients = JSON.parse(localStorage.getItem('hdms_patients')) || initialPatients;

// Function to Render Table
function renderTable() {
    const tbody = document.querySelector('#patientTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    patients.forEach((patient, index) => {
        let statusClass = '';
        let statusText = '';

        switch (patient.status) {
            case 'delivered':
                statusClass = 'delivered';
                statusText = 'Discharged';
                break;
            case 'pending':
                statusClass = 'pending';
                statusText = 'Admitted';
                break;
            case 'return':
                statusClass = 'return';
                statusText = 'Follow-up';
                break;
            default:
                statusClass = 'inProgress';
                statusText = 'In Progress';
        }

        const row = `
            <tr>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.problem}</td>
                <td>${patient.doctor}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button onclick="window.deletePatient(${index})" style="background:none; border:none; cursor:pointer; color:red; font-size:1.2em;" title="Delete">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Update Dashboard Count
    const countElement = document.querySelector('.cardBox .card:nth-child(2) .numbers');
    if (countElement) {
        countElement.innerText = patients.length;
    }
}

// Global Delete Function
window.deletePatient = function (index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem('hdms_patients', JSON.stringify(patients));
        renderTable();
    }
}

// Modal Logic
function openModal() {
    document.getElementById('patientModal').style.display = "block";
}

function closeModal() {
    document.getElementById('patientModal').style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById('patientModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Add New Patient
function addPatient(e) {
    e.preventDefault();

    const name = document.getElementById('pName').value;
    const age = document.getElementById('pAge').value;
    const problem = document.getElementById('pProblem').value;
    const doctor = document.getElementById('pDoctor').value;
    const status = document.getElementById('pStatus').value;

    const newPatient = {
        name: name,
        age: age,
        problem: problem,
        doctor: doctor,
        status: status
    };

    patients.unshift(newPatient);
    localStorage.setItem('hdms_patients', JSON.stringify(patients));
    renderTable();
    closeModal();
    document.getElementById('patientForm').reset();

    alert("Patient Registered Successfully! ✅");
}

// Initial Render
renderTable();
