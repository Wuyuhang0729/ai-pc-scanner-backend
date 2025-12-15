/**
 * 2025 全量硬件性能数据库 (HARDWARE_DB)
 * * 数据来源：
 * - GPU: datatable.csv (新品), datatable (1).csv (高端), datatable (2).csv (中低端)
 * - CPU: datatable (3).csv (Ryzen 5000+), datatable (4).csv (Ryzen 9000), datatable (7).csv (Core Ultra/EPYC)
 * - SSD: datatable (5).csv (主流), datatable (6).csv (高端)
 * * 字段说明：
 * - score: PassMark/基准评分
 * - price: 参考价格 (美元/人民币混算，AI会自动处理)
 * - rank_percent: 市场热度/排名百分比 (越高越热门/高端)
 */

const HARDWARE_DB = {
    // ==================================================================================
    // GPU (显卡) - 覆盖 RTX 50/40/30, RX 9000/7000, 工作站卡
    // ==================================================================================
    
    // --- RTX 50 Series (2025 新品) ---
    "5090 d": { name: "GeForce RTX 5090 D", score: 40831, price: "N/A", rank_percent: "84%", type: "GPU", notes: "合规版旗舰" },
    "5090": { name: "GeForce RTX 5090", score: 38837, price: 2999.99, rank_percent: "79%", type: "GPU", notes: "卡皇" },
    "5080": { name: "GeForce RTX 5080", score: 35875, price: 1199.99, rank_percent: "73%", type: "GPU" },
    "5060 ti": { name: "GeForce RTX 5060 Ti 8GB", score: 22631, price: 332.99, rank_percent: "81%", type: "GPU" },
    "5060 mobile": { name: "GeForce RTX 5060 Mobile", score: "N/A", price: "N/A", rank_percent: "N/A", type: "GPU", notes: "笔记本" },
    "5060": { name: "GeForce RTX 5060", score: 20844, price: 285.99, rank_percent: "86%", type: "GPU", notes: "主流爆款" },
    "5050": { name: "GeForce RTX 5050", score: 17154, price: 249.99, rank_percent: "81%", type: "GPU" },

    // --- RTX 40 Series ---
    "4090": { name: "GeForce RTX 4090", score: 38113, price: 2352.33, rank_percent: "78%", type: "GPU" },
    "4060": { name: "GeForce RTX 4060", score: 19545, price: 299.99, rank_percent: "77%", type: "GPU", notes: "高保有量" },
    "4050 mobile": { name: "GeForce RTX 4050 Mobile", score: "N/A", price: "N/A", rank_percent: "N/A", type: "GPU" },

    // --- AMD Radeon RX 9000/7000 ---
    "9070 xt": { name: "Radeon RX 9070 XT", score: "N/A", price: "N/A", rank_percent: "N/A", type: "GPU", notes: "新品预告" },
    "9060 xt": { name: "Radeon RX 9060 XT 16 GB", score: 19863, price: 289.99, rank_percent: "81%", type: "GPU", notes: "大显存" },
    "7600": { name: "Radeon RX 7600", score: 16594, price: 259.99, rank_percent: "76%", type: "GPU" },
    "6700 xt": { name: "Radeon RX 6700 XT", score: 2200, price: 210.92, rank_percent: "N/A", type: "GPU", notes: "分数存疑，需AI校准" },

    // --- Workstation (生产力) ---
    "rtx 6000 blackwell": { name: "RTX PRO 6000 Blackwell Server Edition", score: 42223, price: "N/A", rank_percent: "86%", type: "GPU" },
    "rtx 6000 workstation": { name: "RTX PRO 6000 Blackwell Workstation Edition", score: 36428, price: "N/A", type: "GPU", rank_percent: "75%" },
    "titan black": { name: "GeForce GTX TITAN Black", score: 9191, price: 1324.33, rank_percent: "8%", type: "GPU" },
    "quadro m2000m": { name: "Quadro M2000M", score: 3410, price: 213.16, rank_percent: "7%", type: "GPU" },

    // --- Legacy / Low End (避坑区) ---
    "hd 6850": { name: "Radeon HD 6850", score: 1938, price: 210.92, rank_percent: "10%", type: "GPU" },
    "hd 7750": { name: "Radeon HD 7750", score: 1702, price: 191.99, rank_percent: "10%", type: "GPU" },
    "hd 6870": { name: "Radeon HD 6870", score: 2205, price: 271.89, rank_percent: "9%", type: "GPU" },
    "hd 5670": { name: "Radeon HD 5670", score: 795, price: 95.14, rank_percent: "9%", type: "GPU" },

    // ==================================================================================
    // CPU (处理器) - 覆盖 Intel Ultra, Ryzen 9000, Threadripper, EPYC
    // ==================================================================================

    // --- Intel Core Ultra ---
    "ultra 7 265k": { name: "Intel Core Ultra 7 265K", score: 58766, price: 292.00, rank_percent: "68.0%", type: "CPU" },
    "ultra 5 245kf": { name: "Intel Core Ultra 5 245KF", score: 43391, price: 214.99, rank_percent: "68.2%", type: "CPU" },
    "14100t": { name: "Intel Core i3-14100T", score: 13614, price: 356.25, rank_percent: "12.9%", type: "CPU" },

    // --- AMD Ryzen 9000/8000/AI ---
    "9950x3d": { name: "AMD Ryzen 9 9950X3D", score: 11254, price: "N/A", rank_percent: "78.6%", type: "CPU", notes: "特殊基准分" },
    "9900x3d": { name: "AMD Ryzen 9 9900X3D", score: 12441, price: "N/A", rank_percent: "86.9%", type: "CPU" },
    "9800x3d": { name: "AMD Ryzen 7 9800X3D", score: 12125, price: "N/A", rank_percent: "84.7%", type: "CPU" },
    "7900x3d": { name: "AMD Ryzen 9 7900X3D", score: 10796, price: "N/A", rank_percent: "75.4%", type: "CPU" },
    "7600x3d": { name: "AMD Ryzen 5 7600X3D", score: "N/A", price: "N/A", rank_percent: "73.4%", type: "CPU" },
    "ai 9 hx 375": { name: "AMD Ryzen AI 9 HX 375", score: 3262, price: "N/A", rank_percent: "N/A", type: "CPU" },

    // --- AMD Ryzen 5000 / Threadripper / EPYC ---
    "5975wx": { name: "AMD Ryzen Threadripper PRO 5975WX", score: 75012, price: 1840.00, rank_percent: "13.8%", type: "CPU", notes: "工作站怪兽" },
    "5500": { name: "AMD Ryzen 5 5500", score: 19311, price: 74.99, rank_percent: "87.0%", type: "CPU", notes: "极致性价比" },
    "4500": { name: "AMD Ryzen 5 4500", score: 16044, price: 68.14, rank_percent: "79.5%", type: "CPU" },
    "7642": { name: "AMD EPYC 7642", score: 59333, price: 1482.45, rank_percent: "13.5%", type: "CPU" },
    "7532": { name: "AMD EPYC 7532", score: 50726, price: 225.00, rank_percent: "76.1%", type: "CPU", notes: "二手神U" },
    "7413": { name: "AMD EPYC 7413", score: 50641, price: 1375.00, rank_percent: "12.4%", type: "CPU" },

    // --- Laptop CPU ---
    "6900hs": { name: "AMD Ryzen 9 6900HS", score: 2613, price: "N/A", rank_percent: "18.2%", type: "CPU" },
    "6800h": { name: "AMD Ryzen 7 6800H", score: 2611, price: "N/A", rank_percent: "18.2%", type: "CPU" },
    "6800hs": { name: "AMD Ryzen 7 6800HS", score: 2551, price: "N/A", rank_percent: "17.8%", type: "CPU" },

    // ==================================================================================
    // SSD (固态硬盘) - 覆盖 旗舰/主流/SATA
    // ==================================================================================
    
    // --- 旗舰级 ---
    "9100 pro": { name: "Samsung 9100 PRO 2TB SSD", score: 86443, price: 219.34, rank_percent: "86%", type: "SSD", notes: "性能榜首" },
    "ct1000p510ssd8": { name: "CT1000P510SSD8 (Crucial)", score: 62954, price: 138.99, rank_percent: "84%", type: "SSD" },
    "sn850x 4tb": { name: "WD BLACK SN850X 4TB", score: 51362, price: 699.99, rank_percent: "51%", type: "SSD" },
    "sn850x": { name: "WD BLACK SN850X 2000GB", score: 51571, price: 289.99, rank_percent: "51%", type: "SSD" },
    "sn7100": { name: "WD BLACK SN7100 2TB", score: 51667, price: 270.45, rank_percent: "35%", type: "SSD" },

    // --- 主流/入门级 ---
    "kingston 500gb": { name: "KINGSTON 500GB SSD", score: 36059, price: 76.93, rank_percent: "86%", type: "SSD" },
    "sn3000": { name: "WD Green SN3000 500GB", score: 28336, price: 61.87, rank_percent: "84%", type: "SSD" },
    "p3": { name: "Crucial P3 1TB SSD", score: 22363, price: 119.9, rank_percent: "34%", type: "SSD" },
    "mushkin pilot": { name: "Mushkin Pilot 500GB PCIe NVMe", score: 13812, price: 75, rank_percent: "34%", type: "SSD" },
    "aorus nvme": { name: "Gigabyte AORUS NVMe Gen4 M.2 1TB", score: "N/A", price: "N/A", rank_percent: "84%", type: "SSD" }, // 占位

    // --- SATA / Low End ---
    "sa400": { name: "KINGSTON SA400 (A400)", score: 2908, price: "N/A", rank_percent: "2%", type: "SSD", notes: "低端勿买" },
    "bx500": { name: "CT240BX500SSD1 (Crucial BX500)", score: 2765, price: 40.99, rank_percent: "2%", type: "SSD" },
    "sv300": { name: "KINGSTON SV300", score: 2630, price: "N/A", rank_percent: "2%", type: "SSD" }
};

// 别名映射 (Alias Map) - 用于模糊匹配
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