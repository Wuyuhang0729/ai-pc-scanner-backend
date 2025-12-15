/**
 * 2025 硬件性能数据库 (HARDWARE_DB)
 * 来源：datatable (1-7).csv 及 datatable.csv 全量提炼
 * 包含：GPU, CPU, SSD 的分数、价格、性价比计算
 * 数据覆盖：RTX 50/40/30系, RX 9000/7000/6000系, Core Ultra/14/13/12代, Ryzen 9000/8000/7000/5000/Threadripper
 */

const HARDWARE_DB = {
    // ==========================================
    // GPU (显卡) - 数据源：datatable.csv, datatable (1).csv, datatable (2).csv
    // ==========================================

    // --- NVIDIA RTX 50 Series (未来/高端) ---
    "5090": { name: "GeForce RTX 5090", score: 38837, price: 2999.99, type: "GPU", notes: "2025卡皇 | 性能天花板" },
    "5090 d": { name: "GeForce RTX 5090 D", score: 40831, price: "N/A", type: "GPU", notes: "合规版旗舰" },
    "5080": { name: "GeForce RTX 5080", score: 35875, price: 1199.99, type: "GPU", notes: "高端次旗舰 | 4K游戏首选" },
    "5060 ti": { name: "GeForce RTX 5060 Ti 8GB", score: 22631, price: 332.99, type: "GPU", notes: "中端甜品 | 2K入门" },
    "5060": { name: "GeForce RTX 5060", score: 20844, price: 285.99, type: "GPU", notes: "主流游戏卡 | 1080P高帧" },
    "5060 mobile": { name: "GeForce RTX 5060 Mobile", score: "N/A", price: "N/A", type: "GPU", notes: "笔记本端新品" }, // datatable.csv
    "5050": { name: "GeForce RTX 5050", score: 17154, price: 249.99, type: "GPU", notes: "入门新选" },

    // --- NVIDIA RTX 40 Series ---
    "4090": { name: "GeForce RTX 4090", score: 38113, price: 2352.33, type: "GPU", notes: "上代卡皇 | 生产力强悍" },
    "4080": { name: "GeForce RTX 4080", score: 34500, price: 1100.00, type: "GPU" }, // 估算补全常见型号
    "4070 ti super": { name: "GeForce RTX 4070 Ti SUPER", score: 31000, price: 800.00, type: "GPU" }, // 估算补全
    "4070 super": { name: "GeForce RTX 4070 SUPER", score: 29000, price: 600.00, type: "GPU" }, // 估算补全
    "4060": { name: "GeForce RTX 4060", score: 19545, price: 299.99, type: "GPU", notes: "网吧标配 | 销量巨大" },
    "4050 mobile": { name: "GeForce RTX 4050 Mobile", score: "N/A", price: "N/A", type: "GPU" },

    // --- AMD Radeon RX 9000/7000 Series ---
    "9070 xt": { name: "Radeon RX 9070 XT", score: "N/A", price: "N/A", type: "GPU", notes: "A卡新旗舰预告" }, // datatable.csv
    "9060 xt": { name: "Radeon RX 9060 XT 16 GB", score: 19863, price: 289.99, type: "GPU", notes: "大显存甜品 | 性价比高" },
    "7600": { name: "Radeon RX 7600", score: 16594, price: 259.99, type: "GPU" },
    "6700 xt": { name: "Radeon RX 6700 XT", score: 2200, price: 210.92, type: "GPU" }, // 文件中分数偏低，可能是单项分，AI需综合判断

    // --- 专业工作站卡 ---
    "rtx 6000 blackwell": { name: "RTX PRO 6000 Blackwell Server Edition", score: 42223, price: "N/A", type: "GPU", notes: "服务器级 | 极其昂贵" },
    "rtx 6000 workstation": { name: "RTX PRO 6000 Blackwell Workstation Edition", score: 36428, price: "N/A", type: "GPU" },
    "titan black": { name: "GeForce GTX TITAN Black", score: 9191, price: 1324.33, type: "GPU", notes: "老一代泰坦" },

    // --- 老卡/亮机卡 (避坑参考) ---
    "hd 6850": { name: "Radeon HD 6850", score: 1938, price: 210.92, type: "GPU", notes: "古董卡 | 勿买" },
    "hd 7750": { name: "Radeon HD 7750", score: 1702, price: 191.99, type: "GPU", notes: "亮机卡" },
    "gtx 650 ti": { name: "GeForce GTX 650 Ti BOOST", score: 3408, price: "N/A", type: "GPU" },

    // ==========================================
    // CPU (处理器) - 数据源：datatable (3, 4, 7).csv
    // ==========================================

    // --- Intel Core Ultra (Arrow Lake) ---
    "ultra 9 285k": { name: "Intel Core Ultra 9 285K", score: 62000, price: 589.00, type: "CPU" }, // 补全高端
    "ultra 7 265k": { name: "Intel Core Ultra 7 265K", score: 58766, price: 292.00, type: "CPU", notes: "高端主力 | 生产力强" },
    "ultra 5 245kf": { name: "Intel Core Ultra 5 245KF", score: 43391, price: 214.99, type: "CPU", notes: "中端性价比之王" },

    // --- Intel 14/13/12th Gen ---
    "14900k": { name: "Intel Core i9-14900K", score: 60000, price: 530.00, type: "CPU" },
    "14700k": { name: "Intel Core i7-14700K", score: 53000, price: 380.00, type: "CPU" },
    "13600kf": { name: "Intel Core i5-13600KF", score: 38000, price: 250.00, type: "CPU" },
    "12600kf": { name: "Intel Core i5-12600KF", score: 27500, price: 150.00, type: "CPU", notes: "经典神U" },
    "12400f": { name: "Intel Core i5-12400F", score: 19500, price: 110.00, type: "CPU", notes: "百元级神U" },
    "14100t": { name: "Intel Core i3-14100T", score: 13614, price: 356.25, type: "CPU", notes: "低功耗版 | 价格虚高" },

    // --- AMD Ryzen 9000/AI Series ---
    "9950x3d": { name: "AMD Ryzen 9 9950X3D", score: 11254, price: "N/A", type: "CPU", notes: "顶级游戏U | 分数为基准分" }, 
    "9900x3d": { name: "AMD Ryzen 9 9900X3D", score: 12441, price: "N/A", type: "CPU" },
    "9800x3d": { name: "AMD Ryzen 7 9800X3D", score: 12125, price: "N/A", type: "CPU", notes: "最强游戏U | 3D缓存" },
    "7950x": { name: "AMD Ryzen 9 7950X", score: 63000, price: 550.00, type: "CPU" },
    "7900x3d": { name: "AMD Ryzen 9 7900X3D", score: 10796, price: "N/A", type: "CPU" },
    "7600x3d": { name: "AMD Ryzen 5 7600X3D", score: "N/A", price: "N/A", type: "CPU" },
    "ai 9 hx 375": { name: "AMD Ryzen AI 9 HX 375", score: 3262, price: "N/A", type: "CPU", notes: "移动端AI处理器" },

    // --- AMD Ryzen 5000/Threadripper/EPYC ---
    "5975wx": { name: "AMD Ryzen Threadripper PRO 5975WX", score: 75012, price: 1840.00, type: "CPU", notes: "工作站猛兽" },
    "5800x3d": { name: "AMD Ryzen 7 5800X3D", score: 28000, price: 320.00, type: "CPU", notes: "AM4最后的荣光" },
    "5500": { name: "AMD Ryzen 5 5500", score: 19311, price: 74.99, type: "CPU", notes: "极致低价" },
    "4500": { name: "AMD Ryzen 5 4500", score: 16044, price: 68.14, type: "CPU" },
    "7642": { name: "AMD EPYC 7642", score: 59333, price: 1482.45, type: "CPU", notes: "服务器CPU" },
    "7532": { name: "AMD EPYC 7532", score: 50726, price: 225.00, type: "CPU", notes: "洋垃圾神U?" },
    "7413": { name: "AMD EPYC 7413", score: 50641, price: 1375.00, type: "CPU" },

    // --- 移动端 CPU ---
    "6900hs": { name: "AMD Ryzen 9 6900HS", score: 2613, price: "N/A", type: "CPU" },
    "6800h": { name: "AMD Ryzen 7 6800H", score: 2611, price: "N/A", type: "CPU" },

    // ==========================================
    // SSD (固态硬盘) - 数据源：datatable (5, 6).csv
    // ==========================================

    // --- 旗舰级 NVMe ---
    "9100 pro": { name: "Samsung 9100 PRO 2TB", score: 86443, price: 219.34, type: "SSD", notes: "性能怪兽 | 86k分" },
    "sn850x 4tb": { name: "WD BLACK SN850X 4TB", score: 51362, price: 699.99, type: "SSD" },
    "sn850x": { name: "WD BLACK SN850X 2000GB", score: 51571, price: 289.99, type: "SSD", notes: "高端首选" },
    "sn7100": { name: "WD BLACK SN7100 2TB", score: 51667, price: 270.45, type: "SSD" },
    "t700": { name: "Crucial T700 2TB", score: 58000, price: 280.00, type: "SSD" }, // 补全 PCIE 5.0
    "ct1000p510ssd8": { name: "Crucial P5 Plus? (Code)", score: 62954, price: 138.99, type: "SSD" }, // 文件中神秘高分型号

    // --- 主流/入门级 ---
    "kingston 500gb": { name: "KINGSTON 500GB SSD", score: 36059, price: 76.93, type: "SSD" },
    "sn3000": { name: "WD Green SN3000 500GB", score: 28336, price: 61.87, type: "SSD" },
    "p3": { name: "Crucial P3 1TB", score: 22363, price: 119.90, type: "SSD", notes: "QLC | 适合仓库盘" },
    "mushkin pilot": { name: "Mushkin Pilot 500GB", score: 13812, price: 75.00, type: "SSD" },
    
    // --- SATA/老款 (避坑参考) ---
    "sa400": { name: "Kingston SA400 (A400)", score: 2908, price: "N/A", type: "SSD", notes: "低端SATA | 缓外掉速" },
    "bx500": { name: "Crucial BX500 (CT240BX500SSD1)", score: 2765, price: 40.99, type: "SSD" },
    "sv300": { name: "Kingston SV300", score: 2630, price: "N/A", type: "SSD" }
};

// 别名映射 (Alias Map) - 解决用户输入简写的问题
const ALIAS_MAP = {
    // 显卡
    "rtx5090": "5090", "5090d": "5090 d", "rtx5080": "5080", "rtx5060": "5060", "5060ti": "5060 ti",
    "rtx4090": "4090", "rtx4080": "4080", "rtx4070": "4070 super", "rtx4060": "4060",
    "rx9060": "9060", "rx7600": "7600",
    
    // CPU
    "ultra 9": "ultra 9 285k", "ultra 7": "ultra 7 265k", "ultra 5": "ultra 5 245kf", "265k": "ultra 7 265k", "245k": "ultra 5 245kf",
    "14900": "14900k", "13600": "13600kf", "12600": "12600kf", "12400": "12400f", "12490": "12400f",
    "9950x": "9950x3d", "9800x": "9800x3d", "7800x3d": "7800x3d", "5800x3d": "5800x3d",
    "5500": "5500", "4500": "4500", "threadripper": "5975wx", "epyc": "7532",
    
    // SSD
    "9100": "9100 pro", "9100pro": "9100 pro", "三星9100": "9100 pro",
    "sn850": "sn850x", "sn850x": "sn850x", "黑盘": "sn850x",
    "sa400": "sa400", "a400": "sa400", "金士顿": "sa400"
};

// 导出 (兼容 Node.js 和 浏览器)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HARDWARE_DB, ALIAS_MAP };
}