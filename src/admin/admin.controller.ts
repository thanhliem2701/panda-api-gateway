import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly AdminService: AdminService) { }

    // Get All User Admin
    @Get('/user-admin')
    async getAllUserAdmin() {
        return this.AdminService.getAllUserAdmin();
    }
    // Get Admin by ID
    @Get('/id/:id')
    async getAdminById(@Param('id') id: string) {
        return this.AdminService.getAdminById(id);
    }
    // Create Admin
    @Post('/create')
    async createAdmin(@Body() data: any) {
        return this.AdminService.createAdmin(data);
    }

    // Update Admin
    @Put('/update')
    async updateAdmin(@Body() updateData: any) {
        return this.AdminService.updateAdmin(updateData);
    }
}