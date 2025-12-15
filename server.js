const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression'); // 新增：引入压缩库
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 启用 Gzip 压缩 (大幅减小文件体积)
app.use(compression());

// 2. 允许跨域和 JSON 解析
app.use(cors());
app.use(express.json());

// 3. 托管静态网页并开启缓存
// maxAge: '1d' 告诉浏览器：这个文件夹里的文件，1天内别再重新下载了，直接用缓存
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d', 
    etag: true
}));

// API 转发接口 (保持不变)
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