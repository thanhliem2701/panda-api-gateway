import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { createClientModule } from "src/common/utils/register-client.module";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    createClientModule('AUTH_SERVICE', 'AMQP_URL', 'AUTH_QUEUE'),
  ],
  controllers: [AuthController],
  providers: [AuthService, ErrorHandleService],
})
export class AuthModule { }
