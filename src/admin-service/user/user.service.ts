import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UserService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly userService: ClientProxy
    ) { }
    //Get all users
    async getAllUsers() {
        const response = await lastValueFrom(this.userService.send("get_all_users", {}))
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success: _, ...data } = response;
        return data;
    }
    //Get user by Id
    async getUserById(id: string) {
        const response = await lastValueFrom(this.userService.send("get_user_by_id", { id }))
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success: _, ...data } = response;
        return data;
    }
    // Create User
    async createUser(user_info: any) {
        const response = await lastValueFrom(this.userService.send("create_new_user", user_info));
        if (!response.success) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success: _, ...data } = response;
        return data;
    }
    // Update User
    async updateUser(updateData: any) {
        const response = await lastValueFrom(this.userService.send("update_user_info", updateData));
        if (!response.success) {
            throw new BadRequestException({ message: response.messages });
        }
        const { success: _, ...data } = response;
        return data;
    }

}