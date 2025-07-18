import { Module } from "@nestjs/common";
import { SideMenuController } from "./side_menu.controller";
import { SideMenuService } from "./side_menu.service";
import { ConfigModule } from "@nestjs/config";
import { S3Service } from "src/common/aws/s3.service";
import { registerJwtModule } from "src/common/utils/jwt-config";
import { createClientModule } from "src/common/utils/register-client.module";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        registerJwtModule(),
        createClientModule('ADMIN_SERVICE', 'AMQP_URL', 'ADMIN_QUEUE'),
    ],
    providers: [SideMenuService, S3Service, ErrorHandleService],
    controllers: [SideMenuController]
})
export class SideMenuModule { }