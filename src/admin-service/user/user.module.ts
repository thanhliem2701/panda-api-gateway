import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import { registerJwtModule } from "src/common/utils/jwt-config";
import { createClientModule } from "src/common/utils/register-client.module";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        registerJwtModule(),
        createClientModule('ADMIN_SERVICE', 'AMQP_URL', 'ADMIN_QUEUE'),
    ],
    controllers: [UserController],
    providers: [UserService, ErrorHandleService]
})
export class UserModule { }