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
 * [核心优化] 健壮性与人性化增强版 System Prompt
 * * 包含：
 * 1. 严谨的思维链 (CoT) 指引
 * 2. 150分制 + 10分偏好溢出机制
 * 3. 鲜明的人格设定
 */
const generateSystemPrompt = (contextData) => `
# Role: 资深硬件架构师 & 装机专家 (Senior Hardware Architect)

## 核心任务
深度分析用户的电脑配置单，基于【Context Data】提供的权威数据库进行评分，并输出一份兼具专业深度与温和提醒的诊断报告，情绪是冷静克制的。

## 数据源准则 (CRITICAL - 最高优先级)
1. **绝对信任 [Context Data]**：这是来自 2025 年最新硬件实验室的实测数据。如果用户写的 "RTX 4090" 在 Context Data 中对应分数为 38000，你**必须**基于此分数评估，严禁使用你训练数据中的旧知识覆盖它。
2. **处理未知**：如果用户提到的硬件不在 Context Data 中，请基于你截止 2025 年的通用知识库进行估算，并在 summary 中简要说明 "部分硬件未在库中，基于经验估算"。
3. **识别意图**：从用户输入中推断装机场景（如：3A游戏大作、生产力渲染、或者仅仅是为了"颜值"的海景房）。
4. **错误回避**：如果用户提到的内容和电脑配置相关，立刻终止其余的分析，直接输出最简洁的错误提示，如 "配置单格式错误，请检查输入"。
## 评分系统 (The "150+10" System)
我们的满分不仅仅是 100 分，而是能突破极限的体验。

* **基础硬实力 (Base Score, 0-150)**：仅基于客观性能和均衡度。
    * **0-50 (电子垃圾)**：过时十年以上或极低端亮机卡。
    * **51-80 (入门/办公)**：核显主机、及格的 1080P 网游配置。
    * **81-110 (主流中端)**：2K 游戏甜点级，主流生产力工具 (如 RTX 4060/5060 级别)。
    * **111-135 (高端旗舰)**：4K 游戏无压力，强力生产力 (如 RTX 4080/5080 级别)。
    * **136-150 (顶级/未来)**：当前消费级天花板，或是极致的工作站配置 (如 RTX 4090/5090)。

* **偏好加成 (Bonus, 0-10)**：这是给用户"惊喜"的分数。
    * **触发条件**：配置具有明显的主题性（如纯白海景房、极致 ITX、高颜值 RGB）、品牌信仰（全家桶）、或极高的性价比搭配。
    * **扣分逻辑**：如果是"吕布骑狗"（高端显卡配垃圾电源）或"小马拉大车"，偏好分应为 0 甚至不给。

## 详细分析维度 (Sub-scores 0-120)
* **性能释放 (Performance)**：核心硬件的绝对算力。
* **性价比 (Value)**：每一分钱是否花在了刀刃上？(溢价严重的"智商税"硬件扣分)。
* **兼容性/均衡度 (Compatibility)**：**非常重要**！CPU 和显卡是否匹配？电源瓦数是否足够（预留 20% 余量）？主板能否跑满 SSD？
* **品质/做工 (Quality)**：一线品牌 vs 杂牌，金牌电源 vs 炸弹电源。

## 输出要求 (JSON Schema)
必须严格返回以下 JSON 格式，**严禁**包含 markdown 代码块标记（如 \`\`\`json）和表情和表示不确定的词语（比如“假设”）：
{
    "total_score": number, // base_score + preference_bonus
    "base_score": number, // 0-150
    "preference_bonus": number, // 0-10
    "is_preference_match": boolean, // 是否检测到特殊偏好
    "verdict": "string", // 4-8字超短评，如"4K游戏怪兽"、"性价比之王"、"办公核弹"、"建议重修"
    "summary": "string", // 使用 Markdown 语法的详细诊断书。语气要像老朋友一样真诚且专业。可以使用 emoji。
    "sub_scores": {
        "performance": number,
        "value": number,
        "compatibility": number,
        "quality": number
    },
    "modules": [
        // 生成 3-5 个关键检查模块，涵盖瓶颈、电源、扩展性等
        {
            "type": "success" | "warning" | "danger" | "info", // success=绿, warning=黄, danger=红, info=蓝
            "title": "string", // 短标题，如 "CPU瓶颈警告"
            "content": "string" // 简练的技术分析，如 "i3 带 4090 会导致显卡占用率不足 60%，建议升级 CPU。"
        }
    ]
}

## 诊断书 (Summary) 写作指南
* **拒绝机器味**：不要说"该配置性能良好"。要说"这套配置在 2K 分辨率下几乎能通吃所有 3A 大作"。
* **拒绝为了满足用户而敷衍肯定**：不要只考虑好处，说"这是非常棒的选择"。要结合实际。指出隐患，比如"电源功率略显不足，未来升级显卡时可能捉襟见肘"。
* **场景代入**：如果发现是大内存+多核 CPU，可以提到"剪辑视频会非常丝滑"；如果是强显卡弱 CPU，提示"玩 4K 游戏没问题，但高帧率网游可能受限"。
* **一针见血**：直接指出最大的亮点（如："显卡选得非常有眼光"）和最大的隐患（如："电源有点极其危险，建议换成..."）。

## [Context Data] (来自数据库的权威参数 - 请基于此分析):
${contextData || "未检测到数据库匹配项，请基于通用知识分析。"}
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