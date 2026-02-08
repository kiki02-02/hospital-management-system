-- HOSPITAL MANAGEMENT SYSTEM - DATABASE SCHEMA
-- Version: 1.0

-- 1. Patients Table
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    uhid VARCHAR(20) UNIQUE NOT NULL, -- Unique Health ID (e.g., PAT-2024-001)
    full_name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    contact_number VARCHAR(15),
    address TEXT,
    emergency_contact VARCHAR(100),
    blood_group VARCHAR(5),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctors Table
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(50) NOT NULL, -- Cardio, Ortho, General, etc.
    consultation_fee DECIMAL(10, 2) NOT NULL,
    phone VARCHAR(15),
    is_available BOOLEAN DEFAULT TRUE,
    joined_date DATE
);

-- 3. Inventory / Medicines Table
CREATE TABLE medicines (
    medicine_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    batch_number VARCHAR(50),
    expiry_date DATE NOT NULL,
    stock_quantity INT DEFAULT 0,
    unit_price DECIMAL(10, 2) NOT NULL,
    supplier_name VARCHAR(100)
);

-- 4. Visits / Appointments
CREATE TABLE visits (
    visit_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    visit_type VARCHAR(10), -- 'OPD', 'IPD', 'Emergency'
    symptoms TEXT,
    diagnosis TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- 5. Billing & Invoices
CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_id INT,
    total_amount DECIMAL(10, 2),
    payment_status VARCHAR(20), -- 'Paid', 'Pending', 'Insurance'
    payment_method VARCHAR(20), -- 'Cash', 'Card', 'UPI'
    invoice_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (visit_id) REFERENCES visits(visit_id)
);
