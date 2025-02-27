// Service worker for the persistent carrot animation
let dashCount = 300;
let isRunning = false;

// Start the animation loop
function startCarrotAnimation() {
    if (isRunning) return;
    isRunning = true;
    
    function animate() {
        dashCount++;
        setTimeout(() => {
            if (isRunning) {
                animate();
            }
        }, 50);
    }
    
    animate();
}

// Handle installation
self.addEventListener('install', event => {
    self.skipWaiting();
    startCarrotAnimation();
});

// Handle activation
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// Handle messages from the page
self.addEventListener('message', event => {
    if (event.data.type === 'getCarrotState') {
        // Send the current state back to the client
        event.source.postMessage({
            type: 'carrotUpdate',
            dashCount: dashCount
        });
    }
}); 