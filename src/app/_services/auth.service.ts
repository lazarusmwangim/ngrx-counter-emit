import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthResponse } from "../_models/auth-response.model";
import { Employee } from "../_models/employee.model";
import { Customer } from "../_models/customer.model";
import { SignUpResponse } from "../_models/signup-response.model";
import { AppState } from "../+store/app.state";
import { Store } from "@ngrx/store";
import { autoLogout } from "../auth/+store/auth.actions";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.url;
    timeOutInterval: any;

    constructor(
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.url + "auth/login", {
            username,
            password
        }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    }

    signup(username: string, password: string): Observable<SignUpResponse> {
        return this.http.post<SignUpResponse>(this.url + "users", {
            username, password
        }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    }

    logout() {
        localStorage.removeItem('userData');
        if (this.timeOutInterval) {
            clearTimeout(this.timeOutInterval);
            this.timeOutInterval = null;
        }
    }

    setCustomerInLocalStorage(user: Customer) {
        localStorage.setItem('userData', JSON.stringify(user));

        this.runCustomerTimeOutInterval(user);
    }

    setEmployeeInLocalStorage(user: Employee) {
        localStorage.setItem('userData', JSON.stringify(user));

        this.runEmployeeTimeOutInterval(user);
    }

    runCustomerTimeOutInterval(user: Customer) {
        const timeToExpire = Number(user.getExpirationTime()) - 100;

        this.timeOutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout())
            // Logout
        }, timeToExpire)
    }

    runEmployeeTimeOutInterval(user: Employee) {
        const timeToExpire = Number(user.getExpirationTime()) - 100;

        this.timeOutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout())
            // Logout
        }, timeToExpire)
    }

    getUserFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData.employee_id) {
                const user = new Employee(userData.employeeID, userData.role,
                    userData.accessToken, userData.status, userData.permissions,
                    userData.expirationTime)

                this.runEmployeeTimeOutInterval(user);

                return user;
            } else {
                const user = new Customer(userData.customerID, userData.accessToken,
                    userData.expirationTime, userData.group_id, userData.groupName,
                    userData.role, userData.permissions);

                this.runCustomerTimeOutInterval(user);

                return user;
            }
        }

        return null;
    }

    formatEmployee(user: AuthResponse) {
        const emp = new Employee(
            user.id ? user.id : -1,
            user.role ? user.role : '-1',
            user.access_token ? user.access_token : '-1',
            user.status ? user.status : '-1',
            user.permissions ? user.permissions : [],
            user.expires_in ? Number(user.expires_in) * 1000 : -1
        )

        return emp;
    }

    formatCustomer(user: AuthResponse) {
        console.log(user)
        const cus = new Customer(
            user.id ? user.id : -1,
            user.access_token ? user.access_token : '-1',
            user.expires_in ? Number(user.expires_in) * 1000 : -1,
            user.group_id ? user.group_id : -1,
            user.group ? user.group : '-1',
            user.role ? user.role : '-1',
            user.permissions ? user.permissions : []

        )

        return cus;
    }
}