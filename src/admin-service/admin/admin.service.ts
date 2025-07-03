import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AdminService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly admin_service: ClientProxy
    ) { }
    // Get All User Admin
    async getAllUserAdmin() {
        const response = await lastValueFrom(this.admin_service.send("get_all_admins", {}));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        } 
        const { success, ...data} = response;
        return data;
    }
    // Get Admin by ID
    async getAdminById(id: string) {
        const response = await lastValueFrom(this.admin_service.send("get_admin_by_id", { id }));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        } 
        const { success, ...data} = response;
        return data;
    }
    // Create Admin
    async createAdmin(admin_info: any) {
        const response = await lastValueFrom(this.admin_service.send("create_new_admin", admin_info));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        } 
        const { success, ...data} = response;
        return data;
    }
    // Update Admin
    async updateAdmin(updateData: any) {
        const response = await lastValueFrom(this.admin_service.send("update_admin_info", updateData ));
        if (response.success === false) {
            throw new BadRequestException({ message: response.messages });
        } 
        const { success, ...data} = response;
        return data; 
    }
}