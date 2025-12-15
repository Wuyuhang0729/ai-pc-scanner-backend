const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS 和 JSON 解析
app.use(cors());
app.use(express.json());

// 托管静态文件 (你的 scanner.html)
// 将 'public' 目录下的文件暴露出去
app.use(express.static(path.join(__dirname, 'public')));

// 核心 API 代理路由
app.post('/api/analyze', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!process.env.DEEPSEEK_API_KEY) {
            return res.status(500).json({ error: "Server API Key not configured" });
        }

        // 向 DeepSeek 发起请求 (Key 在这里使用，用户看不到)
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                temperature: 0.5,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'DeepSeek API Error');
        }

        // 把 DeepSeek 的回复转发给前端
        res.json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});