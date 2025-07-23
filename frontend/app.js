// // const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://expense-tracker-2b7x.onrender.com/api';
// let expenseChart;
// let currentExpenses = []; // ADD THIS LINE to store expenses for download

// document.addEventListener('DOMContentLoaded', () => {
//     const path = window.location.pathname;

//     if (path.endsWith('index.html') || path.endsWith('/')) {
//         if (!localStorage.getItem('token')) {
//             window.location.href = 'login.html';
//             return;
//         }
//         document.getElementById('logout-btn').addEventListener('click', logout);
//         document.getElementById('expense-form').addEventListener('submit', handleExpenseForm);
//         // ADD THESE TWO LINES for the download buttons
//         document.getElementById('download-csv-btn').addEventListener('click', downloadCSV);
//         document.getElementById('download-pdf-btn').addEventListener('click', downloadPDF);
//         fetchExpenses();
//     } else if (path.endsWith('login.html')) {
//         document.getElementById('login-form').addEventListener('submit', login);
//     } else if (path.endsWith('register.html')) {
//         document.getElementById('register-form').addEventListener('submit', register);
//     }
// });

// // --- Authentication Functions (No changes here) ---
// async function register(e) {
//     e.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     try {
//         const res = await fetch(`${API_URL}/auth/register`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await res.json();
//         if (res.ok) {
//             alert('Registration successful! Please login.');
//             window.location.href = 'login.html';
//         } else { throw new Error(data.msg); }
//     } catch (err) { alert(`Error: ${err.message}`); }
// }

// async function login(e) {
//     e.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     try {
//         const res = await fetch(`${API_URL}/auth/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
//         const data = await res.json();
//         if (res.ok) {
//             localStorage.setItem('token', data.token);
//             window.location.href = 'index.html';
//         } else { throw new Error(data.msg); }
//     } catch (err) { alert(`Error: ${err.message}`); }
// }

// function logout() {
//     localStorage.removeItem('token');
//     window.location.href = 'login.html';
// }

// // --- Expense CRUD Functions ---
// async function fetchExpenses() {
//     const token = localStorage.getItem('token');
//     try {
//         const res = await fetch(`${API_URL}/expenses`, {
//             headers: { 'x-auth-token': token }
//         });
//         if (!res.ok) {
//             if (res.status === 401) logout();
//             throw new Error('Failed to fetch expenses');
//         }
//         const expenses = await res.json();
//         currentExpenses = expenses; // Store for download functions
//         displayExpenses(expenses);
//         renderPieChart(expenses);
//     } catch (err) { console.error(err); }
// }

// function displayExpenses(expenses) {
//     const tableBody = document.getElementById('expense-table-body');
//     tableBody.innerHTML = '';
//     expenses.forEach(expense => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${expense.category}</td>
//             <td>₹${expense.amount.toFixed(2)}</td>
//             <td>${new Date(expense.createdAt).toLocaleDateString()}</td>
//             <td>${new Date(expense.updatedAt).toLocaleDateString()}</td>
//             <td>${expense.comments || ''}</td>
//             <td>
//                 <button class="action-btn edit-btn" onclick="populateFormForEdit('${expense._id}', '${expense.category}', ${expense.amount}, '${expense.comments || ''}')">Edit</button>
//                 <button class="action-btn delete-btn" onclick="deleteExpense('${expense._id}')">Delete</button>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// async function handleExpenseForm(e) {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const id = document.getElementById('expense-id').value;
//     const expenseData = {
//         category: document.getElementById('category').value,
//         amount: parseFloat(document.getElementById('amount').value),
//         comments: document.getElementById('comments').value
//     };
//     const isEditing = !!id;
//     const method = isEditing ? 'PUT' : 'POST';
//     const url = isEditing ? `${API_URL}/expenses/${id}` : `${API_URL}/expenses`;
//     try {
//         const res = await fetch(url, {
//             method,
//             headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
//             body: JSON.stringify(expenseData)
//         });
//         if (!res.ok) {
//             const data = await res.json();
//             throw new Error(data.msg);
//         }
//         resetForm();
//         fetchExpenses();
//     } catch (err) { alert(`Error: ${err.message}`); }
// }

// function populateFormForEdit(id, category, amount, comments) {
//     document.getElementById('expense-id').value = id;
//     document.getElementById('category').value = category;
//     document.getElementById('amount').value = amount;
//     document.getElementById('comments').value = comments;
//     document.getElementById('submit-btn').textContent = 'Update Expense';
//     window.scrollTo(0, 0);
// }

// function resetForm() {
//     document.getElementById('expense-form').reset();
//     document.getElementById('expense-id').value = '';
//     document.getElementById('submit-btn').textContent = 'Add Expense';
// }

// async function deleteExpense(id) {
//     if (!confirm('Are you sure you want to delete this expense?')) return;
//     const token = localStorage.getItem('token');
//     try {
//         const res = await fetch(`${API_URL}/expenses/${id}`, {
//             method: 'DELETE',
//             headers: { 'x-auth-token': token }
//         });
//         if (!res.ok) {
//             const data = await res.json();
//             throw new Error(data.msg);
//         }
//         fetchExpenses();
//     } catch (err) { alert(`Error: ${err.message}`); }
// }

// // --- Data Visualization ---
// function renderPieChart(expenses) {
//     const ctx = document.getElementById('expense-chart').getContext('2d');
//     const categoryData = expenses.reduce((acc, expense) => {
//         const category = expense.category.trim();
//         acc[category] = (acc[category] || 0) + expense.amount;
//         return acc;
//     }, {});
//     const labels = Object.keys(categoryData);
//     const data = Object.values(categoryData);
//     if (expenseChart) { expenseChart.destroy(); }
//     expenseChart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Expenses by Category',
//                 data: data,
//                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//                 hoverOffset: 4
//             }]
//         },
//         options: { responsive: true, maintainAspectRatio: false }
//     });
// }

// // --- ADD THESE NEW DOWNLOAD FUNCTIONS ---

// function downloadCSV() {
//     if (currentExpenses.length === 0) {
//         alert('No expenses to download.');
//         return;
//     }
//     const headers = ['Category', 'Amount (₹)', 'Comments', 'Date'];
//     // Handle commas in comments by wrapping fields in double quotes
//     const rows = currentExpenses.map(e => 
//         `"${e.category}","${e.amount.toFixed(2)}","${(e.comments || '').replace(/"/g, '""')}","${new Date(e.createdAt).toLocaleDateString()}"`
//     );
//     const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' + rows.join('\n');
    
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "expenses.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

// function downloadPDF() {
//     if (currentExpenses.length === 0) {
//         alert('No expenses to download.');
//         return;
//     }
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.text("Expense Report", 14, 16);
//     doc.autoTable({
//         head: [['Category', 'Amount (₹)', 'Comments', 'Date']],
//         body: currentExpenses.map(e => [
//             e.category, 
//             e.amount.toFixed(2), 
//             e.comments || '', 
//             new Date(e.createdAt).toLocaleDateString()
//         ]),
//         startY: 20
//     });

//     doc.save('expenses.pdf');
// }

const API_URL = 'https://expense-tracker-2b7x.onrender.com/api'; // Your Render URL
let expenseChart;
let currentExpenses = [];

document.addEventListener('DOMContentLoaded', () => {
    // --- NEW, MORE ROBUST ROUTING LOGIC ---

    // Check for the Register Form on the page
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }

    // Check for the Login Form on the page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    // Check for the main dashboard elements on the page
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        // If we are on the dashboard, make sure we are logged in
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html'; // Redirect to login if no token
            return;
        }
        // Attach all dashboard event listeners
        logoutBtn.addEventListener('click', logout);
        document.getElementById('expense-form').addEventListener('submit', handleExpenseForm);
        document.getElementById('download-csv-btn').addEventListener('click', downloadCSV);
        document.getElementById('download-pdf-btn').addEventListener('click', downloadPDF);
        fetchExpenses();
    }
});


// --- Authentication Functions (No changes here) ---
async function register(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else { throw new Error(data.msg); }
    } catch (err) { alert(`Error: ${err.message}`); }
}

async function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else { throw new Error(data.msg); }
    } catch (err) { alert(`Error: ${err.message}`); }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// --- Expense CRUD Functions (No changes here) ---
async function fetchExpenses() {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${API_URL}/expenses`, {
            headers: { 'x-auth-token': token }
        });
        if (!res.ok) {
            if (res.status === 401) logout();
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await res.json();
        currentExpenses = expenses;
        displayExpenses(expenses);
        renderPieChart(expenses);
    } catch (err) { console.error(err); }
}

function displayExpenses(expenses) {
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = '';
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>${new Date(expense.createdAt).toLocaleDateString()}</td>
            <td>${new Date(expense.updatedAt).toLocaleDateString()}</td>
            <td>${expense.comments || ''}</td>
            <td>
                <button class="action-btn edit-btn" onclick="populateFormForEdit('${expense._id}', '${expense.category}', ${expense.amount}, '${expense.comments || ''}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteExpense('${expense._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function handleExpenseForm(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id = document.getElementById('expense-id').value;
    const expenseData = {
        category: document.getElementById('category').value,
        amount: parseFloat(document.getElementById('amount').value),
        comments: document.getElementById('comments').value
    };
    const isEditing = !!id;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/expenses/${id}` : `${API_URL}/expenses`;
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(expenseData)
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.msg);
        }
        resetForm();
        fetchExpenses();
    } catch (err) { alert(`Error: ${err.message}`); }
}

function populateFormForEdit(id, category, amount, comments) {
    document.getElementById('expense-id').value = id;
    document.getElementById('category').value = category;
    document.getElementById('amount').value = amount;
    document.getElementById('comments').value = comments;
    document.getElementById('submit-btn').textContent = 'Update Expense';
    window.scrollTo(0, 0);
}

function resetForm() {
    document.getElementById('expense-form').reset();
    document.getElementById('expense-id').value = '';
    document.getElementById('submit-btn').textContent = 'Add Expense';
}

async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.msg);
        }
        fetchExpenses();
    } catch (err) { alert(`Error: ${err.message}`); }
}

// --- Data Visualization (No changes here) ---
function renderPieChart(expenses) {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const categoryData = expenses.reduce((acc, expense) => {
        const category = expense.category.trim();
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});
    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);
    if (expenseChart) { expenseChart.destroy(); }
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// --- Download Functions (No changes here) ---
function downloadCSV() {
    if (currentExpenses.length === 0) {
        alert('No expenses to download.');
        return;
    }
    const headers = ['Category', 'Amount (₹)', 'Comments', 'Date'];
    const rows = currentExpenses.map(e => 
        `"${e.category}","${e.amount.toFixed(2)}","${(e.comments || '').replace(/"/g, '""')}","${new Date(e.createdAt).toLocaleDateString()}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n' + rows.join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadPDF() {
    if (currentExpenses.length === 0) {
        alert('No expenses to download.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Expense Report", 14, 16);
    doc.autoTable({
        head: [['Category', 'Amount (₹)', 'Comments', 'Date']],
        body: currentExpenses.map(e => [
            e.category, 
            e.amount.toFixed(2), 
            e.comments || '', 
            new Date(e.createdAt).toLocaleDateString()
        ]),
        startY: 20
    });

    doc.save('expenses.pdf');
}