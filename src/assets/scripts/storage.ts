import {date} from "./index.ts";
import {RestraintStorageType, StorageData} from "../../data/storage.ts";

class BaseStorageClass {
    STORAGENAME = `Reamant2:`;
}

class LocalStorage extends BaseStorageClass implements RestraintStorageType {
    /**
     * 写入
     * @param name
     * @param value
     * @returns {{code: number, data: {time: number, value: *}}}
     */
    public set(name: string, value: any) {
        let data = {value, time: date.nowTimeStamp}
        localStorage.setItem(this.STORAGENAME + name, JSON.stringify(data));

        return {code: 0, data};
    }

    /**
     * 读取
     * @param name
     * @returns {{code: number, data: any}}
     */
    public get(name: string): StorageData {
        let data = JSON.parse(localStorage.getItem(this.STORAGENAME + name) || '{}'),
            result: StorageData = {code: 0, data};

        if (data == null || data == '' || data == undefined) {
            result = {code: -1}
        }
        return result;
    }

    /**
     * 移除
     * @param name
     * @returns {Promise<void>}
     */
    rem(name: string): void {
        localStorage.removeItem(this.STORAGENAME + name);
    }

    /**
     * get localStorage Keys
     * @returns {*}
     */
    keys(): any {
        return localStorage;
    }
}

class SessionStorage extends BaseStorageClass implements RestraintStorageType {
    /**
     * session 添加
     * @param name
     * @param value
     * @returns {{code: number, data: {time: number, value: *}}}
     */
    set(name: string, value: any): StorageData {
        let data = {value, time: date.nowTimeStamp};
        sessionStorage.setItem(this.STORAGENAME + name, JSON.stringify(data));
        return {code: 0, data};
    }

    /**
     * session 获取
     * @param name
     * @returns {{code: number, data: any}}
     */
    get(name: string): StorageData {
        let data = JSON.parse(
            sessionStorage.getItem(this.STORAGENAME + name) || ''
        );
        let result: StorageData = {code: 0, data};
        if (data == null || data == '' || data == undefined) {
            result = {code: -1}
        }
        return result;
    }

    /**
     * session 删除
     * @param name
     */
    rem(name: string): void {
        sessionStorage.removeItem(this.STORAGENAME + name)
    }

    /**
     * get sessionStorage Keys
     * @returns {*}
     */
    keys(): any {
        return sessionStorage.keys()
    }
}

export class Storage {
    public get local(): LocalStorage {
        return new LocalStorage()
    }

    public get session(): SessionStorage {
        return new SessionStorage()
    }
}

export default Storage
