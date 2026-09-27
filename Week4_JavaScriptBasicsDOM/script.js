
function updateTitle() {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    document.getElementById("heading").innerText
= `Time: ${timeString}`;
}
setInterval(updateTitle, 1000);


let themeButton = document.getElementById("themeToggle");
function updateThemeButton() {
 document.body.classList.contains("dark-mode")
 ? (themeButton.innerHTML = "&#9728;", themeButton.setAttribute("aria-label", "Switch to light mode"))
 : (themeButton.innerHTML = "&#9790;", themeButton.setAttribute("aria-label", "Switch to dark mode"));
}

// Function to toggle dark mode
themeButton.addEventListener("click", function() {
 document.body.classList.toggle("dark-mode");
 localStorage.setItem("theme",
document.body.classList.contains("dark-mode") ? "dark" : "light");
 updateThemeButton();
});
 
// Apply saved theme on page load
if (localStorage.getItem("theme") === "dark")
{
 document.body.classList.add("dark-mode");
}
updateThemeButton();

document.getElementById("addTask").addEventListener("click",
function() {
    let taskText = document.getElementById("taskInput").value;
    if (taskText.trim() === "")
return; 
    let newTask = document.createElement("li");
    newTask.innerHTML = `${taskText}
<button class="removeTask">Remove</button>`;
 
    document.getElementById("taskList").appendChild(newTask);
    document.getElementById("taskInput").value
= "";
});
 
// Remove Task
document.getElementById("taskList").addEventListener("click",
function(event) {
    if (event.target.classList.contains("removeTask"))
{
        event.target.parentElement.remove();
    }
});

document.getElementById("contactForm").addEventListener("submit",
function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let modal = document.getElementById("modal");
    let modalMessage = document.getElementById("modalMessage");
 
    if (!email.includes("@"))
{
        modalMessage.innerText
= "Invalid email format!";
    } else {
        modalMessage.innerText
= "Form Submitted Successfully!";
    }
    modal.style.display = "block";
});
 
// Close Modal
document.getElementById("closeModal").addEventListener("click",
function() {
    document.getElementById("modal").style.display
= "none";
});

 document.addEventListener("keydown", function (event) {

            if (event.key.toLowerCase() === "h") {

                document.body.style.backgroundColor = "black";

            }

        });

