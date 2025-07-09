import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ConfigModule } from '@nestjs/config';
import { AdminController } from "./admin.controller";
import { registerJwtModule } from "src/common/utils/jwt-config";
import { createClientModule } from "src/common/utils/register-client.module";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    registerJwtModule(),
    createClientModule('ADMIN_SERVICE', 'AMQP_URL', 'ADMIN_QUEUE'),
  ],
  controllers: [AdminController],
  providers: [AdminService, ErrorHandleService],
})
export class AdminModule { }