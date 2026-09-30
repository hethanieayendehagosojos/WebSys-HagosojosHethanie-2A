const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const msg = document.getElementById("msg");
const searchInput = document.getElementById("searchInput");
const userCount = document.getElementById("userCount");

function showMessage(text, type = "success") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = text;
    msg.replaceChildren(alert);
    setTimeout(() => msg.replaceChildren(), 2500);
}

function renderUsers(users) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(searchTerm)
    );

    userList.innerHTML = "";
    userCount.textContent = `${filteredUsers.length} user${filteredUsers.length === 1 ? "" : "s"}`;

    if (!filteredUsers.length) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.textContent = searchTerm ? "No people match your search." : "No people here yet. Add your first person using the form.";
        userList.replaceChildren(emptyState);
        return;
    }

    const userItems = filteredUsers.map((user) => {
        const item = document.createElement("div");
        item.className = "list-group-item";

        const identity = document.createElement("div");
        identity.className = "user-identity";

        const avatar = document.createElement("span");
        avatar.className = "user-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase();

        const info = document.createElement("div");
        info.className = "user-info";

        const name = document.createElement("div");
        name.className = "user-name";
        name.textContent = user.name;

        const meta = document.createElement("div");
        meta.className = "user-meta";
        meta.textContent = user.age ? `${user.email} / Age ${user.age}` : user.email;

        info.append(name, meta);
        identity.append(avatar, info);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {
            await fetch(`/api/users/${user._id}`, { method: "DELETE" });
            showMessage("User deleted", "warning");
            loadUsers();
        });

        item.append(identity, deleteButton);
        return item;
    });

    userList.replaceChildren(...userItems);
}

async function loadUsers() {
    const res = await fetch("/api/users");
    const users = await res.json();
    renderUsers(users);
}

searchInput.addEventListener("input", loadUsers);

userForm.addEventListener("submit", async (e) => {
e.preventDefault();
const formData = new FormData(userForm);
const payload = Object.fromEntries(formData.entries());
if (payload.age === "") delete payload.age;

const res = await fetch("/api/users", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});

const data = await res.json();
if (!res.ok) {
showMessage(data.error || "Failed to save", "danger");
return;
}

userForm.reset();
showMessage("User saved!");
loadUsers();
});

loadUsers();