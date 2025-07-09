import { Module } from "@nestjs/common";
import { CategoryBannerController } from "./category_banner.controller";
import { CategoryBannerService } from "./category_banner.service";
import { ConfigModule } from "@nestjs/config";
import { registerJwtModule } from "src/common/utils/jwt-config";
import { createClientModule } from "src/common/utils/register-client.module";
import { S3Service } from "src/common/aws/s3.service";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        registerJwtModule(),
        createClientModule('ADMIN_SERVICE', 'AMQP_URL', 'ADMIN_QUEUE')
    ],
    controllers: [CategoryBannerController],
    providers: [CategoryBannerService, S3Service, ErrorHandleService],
})
export class CategoryBannerModule { }