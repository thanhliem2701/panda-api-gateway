import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";


@Injectable()
export class AdminService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly adminService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }
    // Get All User Admin
    async getAllUserAdmin() {
        const response = await lastValueFrom(this.adminService.send("get_all_admins", {}));
        return this.errorHanleService.handleErrors(response)
    }
    // Get Admin by ID
    async getAdminById(id: string) {
        const response = await lastValueFrom(this.adminService.send("get_admin_by_id", { id }));
        return this.errorHanleService.handleErrors(response)
    }
    // Create Admin
    async createAdmin(admin_info: any) {
        const response = await lastValueFrom(this.adminService.send("create_new_admin", admin_info));
        return this.errorHanleService.handleErrors(response)
    }
    // Update Admin
    async updateAdmin(updateData: any) {
        const response = await lastValueFrom(this.adminService.send("update_admin_info", updateData ));
        return this.errorHanleService.handleErrors(response)
    }
}