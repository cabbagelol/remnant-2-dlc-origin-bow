/**
 * 时间
 */

export default class Time {
    public DATE = new Date();

    /**
     * 更新时间
     */
    public update(): this {
        this.DATE = new Date()
        return this;
    }

    /**
     * 获取当前时间戳
     */
    public get nowTimeStamp(): number {
        return this.DATE.getTime();
    }

    /**
     * 程序创建时间
     * 从.env.[mode]配置
     */
    public get appStart(): Date {
        return new Date(1541260800000);
    }

    getUTCTimeStamp() {
        const now = this.DATE;
        return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    }
}
