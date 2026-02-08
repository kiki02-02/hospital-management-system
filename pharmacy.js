// Toggle Menu
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

let list = document.querySelectorAll('.navigation li');
function activeLink() {
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) => item.addEventListener('mouseover', activeLink));

// ============================================
// PHARMACY MANAGEMENT LOGIC
// ============================================

const initialMedicines = [
    { batch: "B1001", name: "Dolo 650", generic: "Paracetamol", stock: 150, expiry: "2024-12-31", price: 3.50 },
    { batch: "B1002", name: "Augmentin 625", generic: "Amoxicillin", stock: 45, expiry: "2024-11-20", price: 22.00 },
    { batch: "B1003", name: "Pan 40", generic: "Pantoprazole", stock: 80, expiry: "2025-05-15", price: 8.00 },
    { batch: "B1004", name: "Allegra 120", generic: "Fexofenadine", stock: 10, expiry: "2024-08-10", price: 15.00 },
];

// Load Medicines
let medicines = JSON.parse(localStorage.getItem('hdms_medicines')) || initialMedicines;

// Render Table
function renderMedicineTable() {
    const tbody = document.querySelector('#medicineTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    medicines.forEach((med, index) => {
        let stockClass = 'delivered';
        let stockText = 'Available';

        if (med.stock <= 0) {
            stockText = "Out of Stock";
            stockClass = "return";
        } else if (med.stock < 20) {
            stockText = "Low Stock";
            stockClass = "pending";
        }

        const row = `
            <tr>
                <td>${med.batch}</td>
                <td>${med.name}</td>
                <td>${med.generic}</td>
                <td>${med.stock}</td>
                <td>${med.expiry}</td>
                <td>₹${med.price}</td>
                <td><span class="status ${stockClass}">${stockText}</span></td>
                <td>
                    <button onclick="window.deleteMedicine(${index})" style="background:none; border:none; cursor:pointer; color:red; font-size:1.2em;" title="Delete">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// DELETE FUNCTION
window.deleteMedicine = function (index) {
    if (confirm("Are you sure you want to delete " + medicines[index].name + "?")) {
        medicines.splice(index, 1);
        localStorage.setItem('hdms_medicines', JSON.stringify(medicines));
        renderMedicineTable();
    }
}

// Attach Functions to Window (Global Scope)
window.openMedicineModal = function () {
    document.getElementById('medicineModal').style.display = "block";
}

window.closeMedicineModal = function () {
    document.getElementById('medicineModal').style.display = "none";
}

// Close if clicked outside
window.onclick = function (event) {
    let modal = document.getElementById('medicineModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Add Medicine
function addMedicine(e) {
    e.preventDefault();

    const name = document.getElementById('mName').value;
    const generic = document.getElementById('mGeneric').value;
    const batch = document.getElementById('mBatch').value;
    const expiry = document.getElementById('mExpiry').value;
    const stock = document.getElementById('mStock').value;
    const price = document.getElementById('mPrice').value;

    const newMed = {
        name: name,
        generic: generic,
        batch: batch,
        expiry: expiry,
        stock: parseInt(stock),
        price: parseFloat(price)
    };

    medicines.unshift(newMed);
    localStorage.setItem('hdms_medicines', JSON.stringify(medicines));

    renderMedicineTable();
    window.closeMedicineModal();
    document.getElementById('medicineForm').reset();

    alert("Medicine Added Successfully! 💊");
}

// Initial Call
renderMedicineTable();

// Attach form submit manually just in case
const form = document.getElementById('medicineForm');
if (form) {
    form.addEventListener('submit', addMedicine);
}
