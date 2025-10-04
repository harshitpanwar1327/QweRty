export interface SubscriptionData {
    uid: number;
    plan_name: string;
    duration: string;
}

export class SubscriptionModels {
    uid: number;
    plan_name: string;
    duration: string;

    constructor(userSubscription: SubscriptionData) {
        this.uid = userSubscription.uid;
        this.plan_name = userSubscription.plan_name;
        this.duration = userSubscription.duration;
    }
}