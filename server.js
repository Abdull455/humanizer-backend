const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/humanize', async (req, res) => {
  const inputText = req.body.input;
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Humanize this: ${inputText}`,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error calling Hugging Face API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));