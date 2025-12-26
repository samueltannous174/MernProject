  const axios = require("axios");
  require("dotenv").config();

  exports.chat = async (req, res) => {
    try {
      const { topic } = req.body;
      console.log(topic);

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful programming tutor. Always respond in structured sections."
        },
        {
          role: "user",
          content: `
  Generate learning resources and mistakes for this programming topic:

  Topic: ${topic}

  Return the answer in this exact format:

  ### 🎥 5 Recommended YouTube Resources
  - Title — URL
  - Title — URL
  - Title — URL
  - Title — URL
  - Title — URL

  ### ⚠️ 5 Common Mistakes (With Explanations)
  1) mistake name
    - why it happens
    - brief code explanation
  2) mistake name
    - why it happens
    - brief code explanation
  3) mistake name
    - why it happens
    - brief code explanation
  4) mistake name
    - why it happens
    - brief code explanation
  5) mistake name
    - why it happens
    - brief code explanation

  Keep explanations short and practical.
  `
        }
      ];

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-oss-20b:free",
          messages
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      res.json(response.data);
    } catch (err) {
      console.error(err.response?.data || err);
      res.status(500).json({ error: "OpenRouter request failed" });
    }
  };
