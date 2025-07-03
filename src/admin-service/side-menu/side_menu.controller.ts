import { Controller, Get, Param, Post, Put, Body } from "@nestjs/common";
import { SideMenuService } from "./side_menu.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('side-menu')
export class SideMenuController{
    constructor( private readonly sideMenuService: SideMenuService){}

    // Get all menus
    @Get("/menus")
    async getAllMenus() {
        return this.sideMenuService.getAllMenus();
    }

    // Create new side menu
    @Post('/create')
    async createSideMenu(@Body() menu_info: any) {
        return this.sideMenuService.createSideMenu(menu_info);
    }

    @Put('/update')
    async updateSideMenu(@Body() menu_info: any) {
        return this.sideMenuService.updateSideMenu(menu_info);
    }

}