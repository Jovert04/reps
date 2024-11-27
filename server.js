const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public")); // Serve static files from "public" folder

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected");

    // Sync messages from tech.html to dashboard.html
    socket.on("action", (data) => {
        console.log(`Action received: ${data}`);
        socket.broadcast.emit("action", data); // Broadcast to other clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
