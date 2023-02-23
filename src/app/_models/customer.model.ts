export class Customer {
    constructor(
        private customerID: number,
        private accessToken: string,
        private expiresIn: number,
        private group_id: number,
        private groupName: string,
        private role: string,
        private permissions: string[]
    ) { }
}