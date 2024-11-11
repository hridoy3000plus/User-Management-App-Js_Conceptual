// Store users
let users = [
  {
    id: 1,
    name: "Md. Najmul Huda Hridoy",
    email: "hridoy@example.com",
    role: "Admin",
  },
  { id: 2, name: "Mynul Islam", email: "mynul@example.com", role: "User" },
];

let editingId = null;

// Template literal for user card
function getUserTemplate(user) {
  return `
        <div class="user-card">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
            </div>
            <div class="actions">
                <button class="edit" onclick="editUser.call(this, ${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser.apply(null, [${user.id}])">Delete</button>
            </div>
        </div>
    `;
}

// Render users
function renderUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = users.map(getUserTemplate).join("");
}

// Add user
const addUser = function (userData) {
  const newUser = {
    id: Date.now(),
    ...userData,
  };
  users.push(newUser);
  renderUsers();
};

// Update user
function updateUser(userId, userData) {
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    renderUsers();
  }
}

// Delete user using .apply()
function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  renderUsers();
}

// Edit user using .call()
function editUser(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    // Fill form with user data
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("role").value = user.role;
    editingId = user.id;
  }
}

// Handle form submission with .bind()
const handleSubmit = function (event) {
  event.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    role: document.getElementById("role").value,
  };

  if (editingId) {
    // Update existing user
    updateUser.bind(null, editingId, userData)();
    editingId = null;
  } else {
    // Add new user
    addUser.bind(null, userData)();
  }

  // Reset form
  event.target.reset();
}.bind(this);

// Initialize
document.getElementById("userForm").addEventListener("submit", handleSubmit);
renderUsers();
