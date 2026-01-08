import {defineConfig} from "vite";
import {cool} from "@cool-vue/vite-plugin";
import tailwindcss from "tailwindcss";
import {join} from "node:path";
import uni from "@dcloudio/vite-plugin-uni";

const resolve = (dir: string) => join(__dirname, dir);

export default defineConfig({
    plugins: [
        uni(),
        cool({
            type: "uniapp-x",
            uniapp: {
                isPlugin: true
            },
            tailwind: {
                enable: true
            }
        })
    ],

    server: {
        port: 9990,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:10010',   // 后端 API 服务器地址
                changeOrigin: true,                // 修改请求头中的 Origin 字段，解决跨域
                rewrite: (path) => path.replace(/^\/api/, ''),  // 可选：去掉路径前缀
                secure: false,                     // 如果目标服务器使用 HTTPS，设置为 true
                ws: false,                          // 如果有 WebSocket 请求，开启此项
            },
        },
    },

    css: {
        postcss: {
            plugins: [tailwindcss({config: resolve("./tailwind.config.ts")})]
        }
    }
});
