export interface ISubscriptionData {
    user_id?: number;
    plan_name?: string;
    status?: string;
    purchase_date?: Date | string;
    activation_date?: Date | string; 
    expiry_date?: Date | string;
}

export class SubscriptionModels {
    user_id?: number;
    plan_name?: string;
    purchase_date?: Date | string;
    activation_date?: Date | string; 
    expiry_date?: Date | string;

    constructor(userSubscription: ISubscriptionData) {
        this.user_id = userSubscription.user_id;
        this.plan_name = userSubscription.plan_name;
        this.purchase_date = userSubscription.purchase_date;
        this.activation_date = userSubscription.activation_date;
        this.expiry_date = userSubscription.expiry_date;
    }
}