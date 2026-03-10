const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const FIREBASE_URL    = "https://sensor-dash-db5fe-default-rtdb.asia-southeast1.firebaseio.com";
const FIREBASE_SECRET = "ZIWlkCoS0LkjDygt1IRa0yqfoXHvATB4WpR2Y9Fz"; // ← Paste your secret here

app.get('/', (req, res) => {
  res.send('Proxy Server Running 24/7 ✅');
});

app.post('/update', async (req, res) => {
  try {
    const data = req.body;
    const path = req.query.path || "sensor_data";
    console.log("📦 Data from ESP32:", data);
    const response = await axios.patch(
      `${FIREBASE_URL}/${path}.json?auth=${FIREBASE_SECRET}`,
      data
    );
    console.log("✅ Sent to Firebase!");
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
