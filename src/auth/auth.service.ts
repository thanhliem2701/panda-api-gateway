import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_SERVICE") private readonly auth_service: ClientProxy
    ) { }

    // Admin Sign In
    async adminSignIn(email: string, pw: string) {
        const result = await lastValueFrom(this.auth_service.send("admin_login", { email, pw }));
        return result;
    }
    // Verify Admin Token
    async verifyAdminToken(token: string) {
        const result = await lastValueFrom(this.auth_service.send("verify_admin_token", { token}));
        return result;
    }
    // User Sign In
    async userSignIn(email: string, pw: string) {
        const result = await lastValueFrom(this.auth_service.send("user_login", { email, pw }));
        return result;
    }
    // Verify Token
    async verifyToken(token: string, secret_code: string) {
        const result = await lastValueFrom(this.auth_service.send("verify_token", { token, secret_code }));
        return result;
    }
    // Refresh Token
    async refreshToken(refreshToken: string, secret_code: string) {
        const result = await lastValueFrom(this.auth_service.send("user_refresh_token", { refreshToken, secret_code }));
        return result;
    }
}
