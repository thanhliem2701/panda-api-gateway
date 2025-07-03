import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-service/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin-service/admin/admin.module';
import { UserModule } from './admin-service/user/user.module';
import { SideMenuModule } from './admin-service/side-menu/side_menu.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    AuthModule,
    AdminModule,
    UserModule,
    SideMenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
