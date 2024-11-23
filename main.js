// Configurable variables
const numberOfButtons = 9999; // Change this to create more buttons
const emojis = ["💅", "🥂", "✨", "👑", "🎁", "🎀", "🌸", "💖", "💃"];

// Hide the surprise message using base64 encoding
const surpriseMessageBase64 = "QmVzdGllc293ZSBiaWxldHkgbmEga29uY2VydCA6bw==";
const decodedMessage = atob(surpriseMessageBase64); // Decode the base64 string

// Discord Webhook URL
const webhookUrl = "https://discord.com/api/webhooks/1277659181264146522/lDlVe_RX-DTyeddty_1GFX3G5ubMz7VFdztl9C3lUNCgmyP4efog3OUEi8DSFtSnueB0";

// DOM elements
const buttonGrid = document.getElementById("buttonGrid");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

// Generate random emoji, ensuring no duplicates next to each other
let lastEmoji = null;

function getRandomEmoji() {
  let emoji;
  do {
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
  } while (emoji === lastEmoji);
  lastEmoji = emoji;
  return emoji;
}

// Generate a secure random index for the winning button (0-based index)
function generateWinningButtonIndex() {
  // Use Math.random() to generate a random winning index within the range of the number of buttons
  return Math.floor(Math.random() * numberOfButtons);
}

// Set a dynamic winning button index
const winningButtonIndex = generateWinningButtonIndex(); // The winner index is now hidden

// Function to send a message to Discord via webhook
function sendDiscordWebhook() {
  const payload = {
    content: "🎉 Someone clicked the winning button! 🎉"
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => console.log("Webhook sent:", data))
    .catch(error => console.error("Error sending webhook:", error));
}

// Create buttons
for (let i = 0; i < numberOfButtons; i++) {
  const button = document.createElement("button");
  button.textContent = getRandomEmoji();
  button.setAttribute("id", `button-${i}`); // Add a unique ID for each button

  button.addEventListener("click", () => {
    if (i === winningButtonIndex) {
      // Show pop-up if it's the winning button
      document.querySelector("#popup p").textContent = decodedMessage; // Set the surprise message
      popup.style.display = "block";
      overlay.style.display = "block";

      // Send the webhook when the winning button is clicked
      sendDiscordWebhook();
    } else {
      // Shrink button but leave a blank spot
      button.classList.add("shrinking");
      button.disabled = true; // Disable button after click
    }
  });

  buttonGrid.appendChild(button);
}

// Close the pop-up
overlay.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});
