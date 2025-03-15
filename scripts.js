async function fetchDiscordProfile() {
  try {
    const response = await fetch("http://localhost:3000/api/discord-profile");
    const result = await response.json();
    if (result.status === "success") {
      const user = result.data;
      document.getElementById("discord-profile").innerHTML = `
        <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256" alt="${user.username}'s Avatar">
        <h4>${user.username}#${user.discriminator}</h4>
        <p>ID: ${user.id}</p>
      `;
    } else {
      document.getElementById("discord-profile").innerHTML = `<p>Error: ${result.message}</p>`;
    }
  } catch (error) {
    document.getElementById("discord-profile").innerHTML = `<p>Failed to load Discord profile. Please try again later.</p>`;
  }
}

function copyScriptToClipboard() {
  const scriptContent = document.getElementById("roblox-script").textContent;
  navigator.clipboard.writeText(scriptContent)
    .then(() => showNotification("Script copied to clipboard!"))
    .catch(() => showNotification("Failed to copy script."));
}

function showNotification(message) {
  const notificationContainer = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notificationContainer.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 10);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const contentSections = document.querySelectorAll(".content");
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("data-target");
      contentSections.forEach(section => {
        section.classList.toggle("hidden", section.id !== targetId);
        section.classList.toggle("active", section.id === targetId);
      });
    });
  });
  fetchDiscordProfile();
  showNotification("Welcome to ShadieVerse!");
});