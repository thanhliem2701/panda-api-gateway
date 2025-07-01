import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/ad/login')
  async adminSignIn(@Body() body: { email: string, pw: string }){
    return this.authService.adminSignIn(body.email, body.pw)
  }

  @Post('/ad/verify')
  async verifyAdminToken(@Body() body: { token:string}) {
    return this.authService.verifyAdminToken(body.token);
  }

  @Post('/user/login')
  async userSignIn(@Body() body: { email: string, pw: string }){
    return this.authService.userSignIn(body.email, body.pw)
  }
  @Post('user/verify')
  async verifyToken(@Body() body: { token: string, secret_code: string }) {
    return this.authService.verifyToken(body.token, body.secret_code);

  }
  @Post('user/refreshtoken')
  async refreshToken(@Body() body: { refreshToken: string, secret_code: string }) {
    return this.authService.refreshToken(body.refreshToken, body.secret_code);
  }
}
