import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class UserService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly userService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }
    //Get all users
    async getAllUsers() {
        const response = await lastValueFrom(this.userService.send("get_all_users", {}))
        return this.errorHanleService.handleErrors(response)
    }
    //Get user by Id
    async getUserById(id: string) {
        const response = await lastValueFrom(this.userService.send("get_user_by_id", { id }))
        return this.errorHanleService.handleErrors(response)
    }
    // Create User
    async createUser(user_info: any) {
        const response = await lastValueFrom(this.userService.send("create_new_user", user_info));
        return this.errorHanleService.handleErrors(response)
    }
    // Update User
    async updateUser(updateData: any) {
        const response = await lastValueFrom(this.userService.send("update_user_info", updateData));
        return this.errorHanleService.handleErrors(response)
    }

}