import { Controller, Get, Post, Put, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { SideMenuService } from "./side_menu.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/aws/s3.service';

@UseGuards(JwtAuthGuard)
@Controller('side-menu')
export class SideMenuController {
    constructor(
        private readonly sideMenuService: SideMenuService,
        private readonly s3Service: S3Service,
    ) { }

    // Get all menus
    @Get("/menus")
    async getAllMenus() {
        return this.sideMenuService.getAllMenus();
    }

    // Create new side menu
    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createSideMenu(@UploadedFile() file: Express.Multer.File, @Body() menu_info: any) {
        let imgurl: string | null = null;
        if (file) {
            imgurl = await this.s3Service.uploadFile(file);
        }
        const payload = { ...menu_info, imgurl }
        return this.sideMenuService.createSideMenu(payload);
    }

    // Update side menu
    @Put('/update')
    @UseInterceptors(FileInterceptor('file'))
    async updateSideMenu(@UploadedFile() file: Express.Multer.File, @Body() menu_info: any) {
        let imgurl: string | null = null;
        if (file) {
            imgurl = await this.s3Service.uploadFile(file);
        }
        const payload = { ...menu_info, imgurl }
        return this.sideMenuService.updateSideMenu(payload);
    }

}