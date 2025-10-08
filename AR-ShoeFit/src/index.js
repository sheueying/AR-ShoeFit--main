import * as deepar from 'deepar';

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

const feetText = document.getElementById("feet-text");
const brandText = document.getElementById("brand-text");
const selectedEffect = sessionStorage.getItem('selectedEffect');

// If there's a selected effect, initialize DeepAR with that effect
if (selectedEffect) {
  initializeDeepar(selectedEffect);
} else {
  // Initialize with default effect if no effect is selected
  initializeDeepar('nike-dunk.deepar');
}
// So we wrap the whole code in an async function that is called immediatly.
async function initializeDeepar(effectName) {
  feetText.style.display = "none";
  
  // Check if we're on HTTPS or localhost
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    alert('Camera access requires HTTPS. Please use https://localhost:8888 or deploy to HTTPS.');
    return;
  }
  
  // Resize the canvas according to screen size. 
  const canvas = document.getElementById('deepar-canvas');
  const scale = window.devicePixelRatio || 1;
  const width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.maxHeight = window.innerHeight + "px";
  canvas.style.maxWidth = width + "px";

  try {
    // Initialize DeepAR with better error handling
    const deepAR = await deepar.initialize({
      licenseKey: 'b98a37541a356069cc7150029aad9ab89a62df4bc7de8f1b82689dd30a2ea69f638a76bb72a8c257',
      canvas: canvas,
      effect: `effects/${effectName}`, // The selected effect file.
      additionalOptions: {
        cameraConfig: {
          facingMode: "user", // Use the front camera for foot tracking.
          resolution: { width: 1280, height: 720 }
        },
        hint: "footInit",
      }
    }); 
    
    // Hide the loading screen.
    document.getElementById("loader-wrapper").style.display = "none";
    brandText.style.display="flex";
    
    // Register for a callback when feet are detected.
    deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
      const feetText = document.getElementById("feet-text");
      if (leftFoot.detected || rightFoot.detected) {
        feetText.style.display = "none";
        deepAR.callbacks.onFeetTracked = undefined;
      }
    };

    return deepAR;
    
  } catch (error) {
    console.error('DeepAR initialization failed:', error);
    document.getElementById("loader-wrapper").style.display = "none";
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      z-index: 1000;
      max-width: 80%;
    `;
    errorDiv.innerHTML = `
      <h3>Camera Access Error</h3>
      <p>Unable to access camera. Please:</p>
      <ul style="text-align: left;">
        <li>Allow camera permissions when prompted</li>
        <li>Make sure no other app is using the camera</li>
        <li>Try refreshing the page</li>
        <li>Use HTTPS (https://localhost:8888)</li>
      </ul>
      <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background: white; color: red; border: none; border-radius: 5px; cursor: pointer;">Retry</button>
    `;
    document.body.appendChild(errorDiv);
    
    throw error;
  }
}
function getEffectNameFromCardId(cardId) {
  // Example implementation: Return different effect names based on card IDs
  return cardId;
}

// Perform actions when a product card is clicked
function onProductCardClick(cardId) {
  // Retrieve the effect name based on the selected card ID
  const effectName = getEffectNameFromCardId(cardId);
  sessionStorage.setItem('selectedEffect', effectName);
  // Reload DeepAR with the selected effect
  window.location.reload();
}

// Example of adding click event listeners to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('click', function() {
    const cardId = this.id; // Get the ID of the clicked card
    onProductCardClick(cardId);
  });
});