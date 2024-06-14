const express = require('express');
const httpProxy = require('http-proxy-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const {verifyToken} = require('./auth'); // Import custom authentication module
const app = express();
const port = process.env.PORT || 8000; // Use environment variable or default port
const apiTarget = 'http://localhost:8080'; // Replace with your Python API target URL

app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/api',verifyToken)
var users = {}

// Reverse proxy middleware
const apiProxy = httpProxy.createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true, // Adjust headers for proxied requests
    pathRewrite: function (path, req) {
        // Remove /api prefix from proxied requests (optional)
        console.log(path.replace(/^\/api/, ''))
        return path.replace(/^\/api/, '');
    }
});

app.use('/api',apiProxy); // Proxy all API requests to Python backend

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports ={users}
