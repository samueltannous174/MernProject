const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;


//app.post("/learning-videos",



exports.chat = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
When a user gives a programming topic, provide 5 YouTube video URLs in a logical learning sequence from beginner to advanced.
Return JSON only in this format:
[
  {"step":1,"title":"HTML & CSS Basics","url":"https://youtube.com/..."},
  {"step":2,"title":"JavaScript Basics","url":"https://youtube.com/..."},
  {"step":3,"title":"Frontend Framework","url":"https://youtube.com/..."},
  {"step":4,"title":"Backend Development","url":"https://youtube.com/..."},
  {"step":5,"title":"Full Stack Project","url":"https://youtube.com/..."}
]
User Topic: ${topic}
    `;

    console.log("entered");


    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "tngtech/deepseek-r1t2-chimera:free", // switched to free Devstral model
        messages: [
          { role: "system", content: "You are a helpful programming tutor AI." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response.data);

    console.log("done");

    const reply = response.data.choices[0].message.content;
    console.log(reply);

   
    // try {
    //   videos = JSON.parse(reply);
    // } catch {
    //   videos = [{ step: 0, title: "Error parsing AI response", url: "" }];
    // }

    // res.json({ videos });
    res.json(response.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || "Something went wrong" });
  }
};
