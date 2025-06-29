import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SideMenuModule } from './side_menu/side_menu.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
