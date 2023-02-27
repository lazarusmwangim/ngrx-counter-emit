export interface AuthResponse {
    success?: boolean;
    message?: string;
    error?: string;

    access_token?: string;
    expires_in?: number;
    status?: string;
    permissions?: string[];
    employee_id?: number;

    id?: number;
    group_id?: number;
    group?: string;
    role?: string;
}