// services/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login-service';

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LoginService);
    const token = loginService.getToken();

    console.log("Token in interceptor:", token);

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
