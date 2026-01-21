export function parseData<T>(data: any): T | null {
    // #ifdef APP-ANDROID
    // @ts-ignore
    return JSON.parseObject<T>(JSON.stringify(data));
    // #endif

    // #ifndef APP-ANDROID
    return data as T;
    // #endif
}