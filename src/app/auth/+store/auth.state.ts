import { Customer } from "src/app/_models/customer.model"
import { Employee } from "src/app/_models/employee.model"


export interface AuthState {
    user: Employee | Customer | null;
}

export const initialAuthState: AuthState = {
    user: null,
}
