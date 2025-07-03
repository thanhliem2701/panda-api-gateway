import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_SERVICE") private readonly authService: ClientProxy
    ) { }

    // Admin Sign In
    async adminSignIn(email: string, pw: string) {
        const response = await lastValueFrom(this.authService.send("admin_login", { email, pw }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }
    // Verify Admin Token
    async verifyAdminToken(token: string) {
        const response = await lastValueFrom(this.authService.send("verify_admin_token", { token }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }
    // User Sign In
    async userSignIn(email: string, pw: string) {
        const response = await lastValueFrom(this.authService.send("user_login", { email, pw }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }
    // Verify Token
    async verifyToken(token: string, secret_code: string) {
        const response = await lastValueFrom(this.authService.send("verify_token", { token, secret_code }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }
    // Refresh Token
    async refreshToken(refreshToken: string, secret_code: string) {
        const response = await lastValueFrom(this.authService.send("user_refresh_token", { refreshToken, secret_code }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }
}
