// gateway/index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

// Proxy: /api/buses → backend
app.use('', createProxyMiddleware({
  target: 'http://localhost:3000/', // assuming backend runs on 3000
  changeOrigin: true
}));

// app.use('/api/products', createProxyMiddleware({
//   target: 'http://localhost:3000/api/products', // assuming backend runs on 3000
//   changeOrigin: true
// }));

// app.use('/api/auth/login', createProxyMiddleware({
//   target: 'http://localhost:3000/api/auth/login', // assuming backend runs on 3000
//   changeOrigin: true
// }));
// Add more proxies as needed...

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ API Gateway running at http://localhost:${PORT}`);
});
