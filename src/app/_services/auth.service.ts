import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../_models/auth-response.model";
import { Employee } from "../_models/employee.model";
import { Customer } from "../_models/customer.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.url;

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.url + "auth/login", {
            username,
            password
        }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    }

    formatEmployee(user: AuthResponse) {
        const emp = new Employee(
            user.employee_id ? user.employee_id : -1,
            user.role ? user.role : '-1',
            user.access_token ? user.access_token : '-1',
            user.status ? user.status : '-1',
            user.permissions ? user.permissions : [],
            user.expires_in ? user.expires_in : -1
        )

        return emp;
    }

    formatCustomer(user: AuthResponse) {
        const cus = new Customer(
            user.employee_id ? user.employee_id : -1,
            user.access_token ? user.access_token : '-1',
            user.expires_in ? user.expires_in : -1,
            user.group_id ? user.group_id : -1,
            user.group ? user.group : '-1',
            user.role ? user.role : '-1',
            user.permissions ? user.permissions : []

        )

        return cus;
    }
}