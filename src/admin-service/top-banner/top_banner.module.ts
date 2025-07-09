import { Module } from "@nestjs/common";
import { TopBannerController } from "./top_banner.controller";
import { TopBannerService } from "./top_banner.service";
import { ConfigModule } from "@nestjs/config";
import { S3Service } from "src/common/aws/s3.service";
import { registerJwtModule } from "src/common/utils/jwt-config";
import { createClientModule } from "src/common/utils/register-client.module";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
    imports: [
        registerJwtModule(),
        createClientModule('ADMIN_SERVICE', 'AMQP_URL', 'ADMIN_QUEUE'),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [TopBannerController],
    providers: [TopBannerService, S3Service, ErrorHandleService],
})
export class TopBannerModule { }