export function parseData<T>(data: any): T | null {
    // #ifdef APP-ANDROID
    // @ts-ignore
    return JSON.parseObject<T>(JSON.stringify(data));
    // #endif

    // #ifndef APP-ANDROID
    return data as T;
    // #endif
}

export function formatDate(date: Date | null): string {
    if (date == null) {
        return '';
    }
    const year = date.getFullYear();  // 获取年份
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 获取月份，+1 因为月份从 0 开始
    const day = date.getDate().toString().padStart(2, '0');  // 获取日期
    const hours = date.getHours().toString().padStart(2, '0');  // 获取小时
    const minutes = date.getMinutes().toString().padStart(2, '0');  // 获取分钟
    const seconds = date.getSeconds().toString().padStart(2, '0');  // 获取秒

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  // 格式化为 yyyy-MM-dd HH:mm:ss
}

export function parseDate(dateformat: string): Date {
    return new Date(dateformat.replace(' ', 'T'));
}