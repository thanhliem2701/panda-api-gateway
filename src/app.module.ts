import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-service/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin-service/admin/admin.module';
import { UserModule } from './admin-service/user/user.module';
import { SideMenuModule } from './admin-service/side-menu/side_menu.module';
import { CategoryModule } from './admin-service/category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './common/aws/s3.service';
import { TopBannerModule } from './admin-service/top-banner/top_banner.module';
import { CategoryBannerModule } from './admin-service/category-banner/category_banner.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    MulterModule.register({
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
    AuthModule,
    AdminModule,
    UserModule,
    SideMenuModule,
    CategoryModule,
    TopBannerModule,
    CategoryBannerModule,
  ],
  controllers: [AppController],
  providers: [AppService,S3Service],
})
export class AppModule { }
