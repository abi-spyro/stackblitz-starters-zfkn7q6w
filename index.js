const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello CodeSandbox!');
});

app.get('/api/tripadvisor/*', async (req, res) => {
  try {
    const endpoint = req.path.replace('/api/tripadvisor/', '');

    const response = await axios.get(
      `https://api.content.tripadvisor.com/api/v1/${endpoint}`,
      {
        params: {
          ...req.query,
          key: process.env.TRIPADVISOR_API_KEY,
        },
        headers: {
          accept: "application/json",
          Referer: req.hostname,
        },
        timeout: 10000 // 10s
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Request failed' });
  }
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
