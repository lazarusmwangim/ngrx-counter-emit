export class Employee {
    constructor(
        private employeeID: number,
        private role: string,
        private accessToken: string,
        private status: string,
        private permissions: string[],
        private expirationTime: number
    ) { }

    
}