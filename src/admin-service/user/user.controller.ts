import { Controller, Get, Param, Post, Put, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Get all users
    @Get("/users")
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    // Get user by Id
    @Get('/id/:id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    // Create user
    @Post('/create')
    async createUser(@Body() data: any) {
        return this.userService.createUser(data);
    }

    // Update user
    @Put('/update')
    async updateUser(@Body() updateData: any) {
        return this.userService.updateUser(updateData);
    }
}