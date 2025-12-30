const axios = require("axios");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    let { title, messages } = req.body;

    let prompt = "";

    // 🟢 Case 1: Topic-based roadmap
    if (title) {
      prompt = `
You are a programming tutor. Always produce clean structured roadmaps using Markdown headings and lists — never tables.

Generate a learning roadmap for this programming topic:

Topic: ${title}

FORMAT RULES (IMPORTANT):
- Use ONLY the sections shown below
- Do NOT repeat sections
- Do NOT append extra text at the end
- Do NOT output duplicate Common Mistakes
- Do NOT output extra “Video Resources” URL lists

REQUIRED OUTPUT FORMAT

### 🖼 Main Image (Topic Cover — Valid Direct Image URL)
(Exactly 1 image)

- URL ONLY (no markdown, no text, no captions)
- Must be a direct JPG / PNG / WEBP
- Prefer Unsplash, Pexels, or Wikimedia


### 🎯 Learning Path (Ordered — Beginner ➜ Advanced)
(Exactly 5 stages)

1) Stage — description
2) Stage — description
3) Stage — description
4) Stage — description
5) Stage — description

### 🎥 5 Recommended YouTube Resources (Follow Same Order)
(Exactly 5 items in this format)

- Stage N — Title — URL

(Use valid YouTube URLs — no extra characters)

+ URL RULES (MUST follow one of these formats ONLY):
+ https://www.youtube.com/watch?v=VIDEO_ID
+ https://youtu.be/VIDEO_ID
+
+ Do NOT output:
+ - channel links
+ - playlist links
+ - shorts links
+ - redirect/tracking links
+ - truncated or partial URLs


### ⚠️ 5 Common Mistakes (With Practical Explanations)
(Exactly 5 items — no duplicates)

1) Mistake Name
   - What beginners do wrong:
   - Why it causes issues:
   - Code example:
   \`\`\`js
   \`\`\`
`;
    }

    else if (Array.isArray(messages)) {
      prompt = messages.map(m => m.content).join("\n");
    }

    else {
      return res.status(400).json({
        error: "Request must include either title or messages[]"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🟢 Gemini Output:\n", text);

    res.json({
      content: text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Gemini request failed"
    });
  }
};



const AiTopic = require("../models/AiTopic");

exports.createAiTopic = async (req, res) => {
  try {
const { user, title, learningPath, videos, mistakes, fullResponse, mainImage } = req.body;


    // console.log(req.body);
    console.log(req.body);


    if (!user || !title) {
      return res.status(400).json({
        message: "user and title are required"
      });
    }


    const doc = await AiTopic.create({
      user,
      title,
      learningPath,
      videos,
      mistakes,
      fullResponse,
      mainImage
    });
    

    res.status(201).json(doc);

  } catch (err) {
    console.error("❌ createAiTopic failed:", err);

    return res.status(500).json({
      message: "Server error while saving topic",
      error: err.message
    });
  }
}





exports.getUserTopics = async (req, res) => {
  try {
    const { userId } = req.params;

    const topics = await AiTopic.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(topics);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAiTopicById = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await AiTopic.findById(id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteAiTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const topic = await AiTopic.findById(id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    if (topic.user.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await topic.deleteOne();

    res.status(200).json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

