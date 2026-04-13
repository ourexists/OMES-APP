export const proxy = {
    // 开发环境配置
    dev: {
        // 官方测试地址
        // 本地地址
        target: "http://192.168.1.3:10010",
        changeOrigin: true,
        // target: "http://22x2097c96.imwork.net",
        rewrite: (path: string) => path.replace("/dev", "")
    },

    // 生产环境配置
    prod: {
        // 官方测试地址
        target: "https://222qc09hk796.vicp.fun",
        changeOrigin: true,
        rewrite: (path: string) => path.replace("/prod", "/api")
    }
};

export const value = "dev";
