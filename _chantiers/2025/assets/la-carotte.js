let dashCount = 300;
const ports = [];

// Animation function
function animate() {
    dashCount++;
    
    // Send update to all connected pages
    ports.forEach(port => {
        port.postMessage({
            type: 'update',
            dashCount: dashCount
        });
    });
    
    setTimeout(animate, 50);
}

// Start the animation
animate();

// Handle connections from pages
self.onconnect = function(e) {
    const port = e.ports[0];
    ports.push(port);
    
    port.onmessage = function(e) {
        if (e.data.type === 'getUpdate') {
            port.postMessage({
                type: 'update',
                dashCount: dashCount
            });
        }
    };
    
    port.start();
}; 