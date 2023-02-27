export class Customer {
    constructor(
        private customerID: number,
        private accessToken: string,
        private expirationTime: number,
        private group_id: number,
        private groupName: string,
        private role: string,
        private permissions: string[]
    ) { }

    getExpirationTime() {
        return this.expirationTime;
    }
     
    getAccessToken() {
        return this.accessToken;
    }

    isCustomer() {
        return true;
    }
}