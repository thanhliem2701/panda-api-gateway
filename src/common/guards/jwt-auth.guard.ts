import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const rolesStr = this.configService.get<string>('ALLOWED_ROLES') || '';
      const allowedRoles = rolesStr.split(',').map(r => r.trim().toUpperCase());
      if (!decoded.data.role || !allowedRoles.includes(decoded.data.role) ) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }
  }
}