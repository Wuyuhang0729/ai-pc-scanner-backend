const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(cors());
app.use(express.json());

// [修改] 调试阶段将 maxAge 设为 0，防止浏览器缓存旧代码
// 等项目完全定型上线后，再改回 '1d'
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '0', 
    etag: false // 关闭 ETag 也有助于强制刷新
}));

app.post('/api/analyze', async (req, res) => {
    try {
        const apiKey = process.env.DEEPSEEK_API_KEY; 
        
        if (!apiKey) {
            console.error("Error: Missing DEEPSEEK_API_KEY.");
            return res.status(500).json({ error: "服务器 API Key 配置缺失" });
        }

        const { messages } = req.body;

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
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
            throw new Error(data.error?.message || `DeepSeek API Error: ${response.status}`);
        }

        res.json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});