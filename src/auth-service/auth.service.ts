import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }

    // Admin Sign In
    async adminSignIn(email: string, pw: string) {
        const response = await lastValueFrom(this.authService.send("admin_login", { email, pw }));
        return this.errorHanleService.handleErrors(response)
    }
    // Verify Admin Token
    async verifyAdminToken(token: string) {
        const response = await lastValueFrom(this.authService.send("verify_admin_token", { token }));
        return this.errorHanleService.handleErrors(response)
    }
    // User Sign In
    async userSignIn(email: string, pw: string) {
        const response = await lastValueFrom(this.authService.send("user_login", { email, pw }));
        return this.errorHanleService.handleErrors(response)
    }
    // Verify Token
    async verifyToken(token: string, secret_code: string) {
        const response = await lastValueFrom(this.authService.send("verify_token", { token, secret_code }));
        return this.errorHanleService.handleErrors(response)
    }
    // Refresh Token
    async refreshToken(refreshToken: string, secret_code: string) {
        const response = await lastValueFrom(this.authService.send("user_refresh_token", { refreshToken, secret_code }));
        return this.errorHanleService.handleErrors(response)
    }
}
