// Initialize variables for iframe manipulation
let model;
const iframe = document.getElementById("techIframe");
let parkedCars = 0; // Counter for parked cars
const detectedCars = []; // Array to track detected cars
const carStayThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

// Load the object detection model
async function loadModel() {
    model = await cocoSsd.load(); // Load COCO-SSD model
    detectObjects(); // Start object detection, independent of iframe
}

// Detect objects in the video stream
async function detectObjects() {
    if (!model) return; // Exit if model is not loaded

    // Check if iframe has content loaded
    if (iframe.contentWindow) {
        const videoElement = iframe.contentWindow.document.querySelector("video");
        if (videoElement) {
            const predictions = await model.detect(videoElement); // Detect objects in the video

            // Do something with predictions here...
            predictions.forEach((prediction) => {
                if (prediction.class === "car" && prediction.score > 0.5) {
                    // Track car logic here
                    console.log(`Car detected: ${prediction.class}`);
                }
            });

            // Repeat detection
            requestAnimationFrame(detectObjects);
        }
    }
}

// Load the model
loadModel();
