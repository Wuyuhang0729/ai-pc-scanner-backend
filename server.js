const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 启用 Gzip 压缩
app.use(compression());
app.use(cors());
app.use(express.json());

// [恢复] 静态资源服务配置
// maxAge: '1d' - 允许浏览器缓存文件 1 天，大幅提升二次访问速度
// etag/lastModified: true - 允许浏览器在缓存过期后向服务器询问"文件变了吗？"如果没变返回 304，不消耗带宽
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',       
    etag: true,        
    lastModified: true 
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