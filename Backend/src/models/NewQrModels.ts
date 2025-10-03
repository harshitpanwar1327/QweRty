export interface INewQrData {
    user_id?: number;
    name?: string;
    qr_type?: string;
    content?: object | string;
    design?: object | string;
    from_date?: Date | string;
    to_date?: Date | string;
    scan_limit?: number;
    password?: string | number;
    state?: string;
}

export class NewQrModels {
    user_id?: number;
    name?: string;
    qr_type?: string;
    content?: object | string;
    design?: object | string;
    from_date?: Date | string;
    to_date?: Date | string;
    scan_limit?: number;
    password?: string | number;
    state?: string;

    constructor(userNewQr: INewQrData) {
        this.user_id = userNewQr.user_id;
        this.name = userNewQr.name;
        this.qr_type = userNewQr.qr_type;
        this.content = userNewQr.content;
        this.design = userNewQr.design;
        this.from_date = userNewQr.from_date;
        this.to_date = userNewQr.to_date;
        this.scan_limit = userNewQr.scan_limit;
        this.password = userNewQr.password;
        this.state = userNewQr.state;
    }
}