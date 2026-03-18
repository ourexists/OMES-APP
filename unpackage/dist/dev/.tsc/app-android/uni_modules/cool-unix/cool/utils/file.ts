import { base64ToBlob, uuid } from "./comm";

/**
 * 将canvas转换为png图片
 * @param options 转换参数
 * @returns 图片路径
 */
export function canvasToPng(canvasRef: UniElement): Promise<string> {
	return new Promise((resolve) => {

		canvasRef.parentElement!.takeSnapshot({
			success(res) {
				resolve(res.tempFilePath);
			},
			fail(err) {
				__f__('error','at uni_modules/cool-unix/cool/utils/file.ts:16',err);
				resolve("");
			}
		});





















































	});
}
