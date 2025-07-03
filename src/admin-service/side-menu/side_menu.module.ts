import { Module } from "@nestjs/common";
import { SideMenuController } from "./side_menu.controller";
import { SideMenuService } from "./side_menu.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || '',
            signOptions: { expiresIn: '1d' },
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.registerAsync([
            {
                name: 'ADMIN_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                    const amqp_url = configService.get<string>('AMQP_URL') || '';
                    const admin_queue = configService.get<string>('ADMIN_QUEUE') || '';
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [amqp_url],
                            queue: admin_queue,
                            queueOptions: { durable: true },
                        }
                    }
                }
            },
        ]),
    ],
    providers: [SideMenuService],
    controllers: [SideMenuController]
})
export class SideMenuModule { }