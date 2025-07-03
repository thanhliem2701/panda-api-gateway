import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UserService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly user_service: ClientProxy
    ) { }
    //Get all users
    async getAllUsers() {
        const response = await lastValueFrom(this.user_service.send("get_all_users", {}))
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success, ...data } = response;
        return data;
    }

}