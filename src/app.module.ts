import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-service/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin-service/admin/admin.module';
import { UserModule } from './admin-service/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
