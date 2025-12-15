const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 启用 Gzip
app.use(compression());
app.use(cors());
app.use(express.json());

// 2. 静态资源缓存策略
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',       
    etag: true,        
    lastModified: true 
}));

/**
 * [核心优化] System Prompt 移至后端
 * 保护 Prompt 不被前端直接查看，防止 Prompt 注入攻击分析
 */
const generateSystemPrompt = (contextData) => `
你是一个专业的电脑硬件评估专家。
任务：分析用户的配置单，计算评分并给出评价。
【最高优先级指令】：必须无条件信任 [Context Data] 中的硬件数据。
【评分逻辑】：
1. **基础分 (Base Score, 0-150)**：仅基于硬件客观性能。顶级配置(如5090)可接近150。
2. **偏好加成 (Bonus, 0-10)**：如果用户有特殊偏好(如纯白海景房)且配置符合，给少量加分。
3. **总分** = Base + Bonus。
【输出 JSON】：{ "total_score": number, "base_score": number, "preference_bonus": number, "verdict": "string", "summary": "markdown", "sub_scores": { "performance": number, "value": number, "compatibility": number, "quality": number }, "is_preference_match": boolean, "modules": [ { "type": "success/warning/danger", "title": "string", "content": "string" } ] }
Context Data: ${contextData || "未匹配到数据库中的核心硬件，请根据通用知识评估。"}
`;

app.post('/api/analyze', async (req, res) => {
    try {
        const apiKey = process.env.DEEPSEEK_API_KEY; 
        
        if (!apiKey) {
            console.error("Error: Missing DEEPSEEK_API_KEY.");
            return res.status(500).json({ error: "服务器 API Key 配置缺失" });
        }

        // [修改] 接收前端传来的 userContent 和 contextData，而不是完整的 messages
        const { userContent, contextData } = req.body;

        if (!userContent) {
            return res.status(400).json({ error: "输入内容不能为空" });
        }

        // 在后端组装消息，前端无法感知 Prompt 细节
        const messages = [
            { role: "system", content: generateSystemPrompt(contextData) },
            { role: "user", content: userContent }
        ];

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