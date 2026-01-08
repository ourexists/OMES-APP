import { defineConfig } from "vite";
import { cool } from "@cool-vue/vite-plugin";
import tailwindcss from "tailwindcss";
import { join } from "node:path";
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
		port: 9990
	},

	css: {
		postcss: {
			plugins: [tailwindcss({ config: resolve("./tailwind.config.ts") })]
		}
	}
});
