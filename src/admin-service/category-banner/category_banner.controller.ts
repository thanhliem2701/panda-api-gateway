import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Put } from "@nestjs/common";
import { CategoryBannerService } from "./category_banner.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { S3Service } from 'src/common/aws/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('category-banner')
export class CategoryBannerController {
    constructor(
        private readonly categoryBannerService: CategoryBannerService,
        private readonly s3Service: S3Service,
    ) { }

    // Get all category Banner
    @Get('category-banners')
    async getAllCategoryBanners() {
        return await this.categoryBannerService.getAllCategoryBanners();
    }

    // Create category banner
    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createCategoryBanner(@UploadedFile() file: Express.Multer.File, @Body() category_banner_info: any) {
        let payload: any;
        if (file) {
            const imgurl = await this.s3Service.uploadFile(file);
            payload = { ...category_banner_info, imgurl }
        } else {
            payload = { ...category_banner_info }
        }
        return await this.categoryBannerService.createCategoryBanner(payload)
    }

    // Update category banner
    @Put('/update')
    @UseInterceptors(FileInterceptor('file'))
    async updateTopBanner(@UploadedFile() file: Express.Multer.File, @Body() category_banner_info: any) {
        let payload: any;
        if (file) {
            const imgurl = await this.s3Service.uploadFile(file);
            payload = { ...category_banner_info, imgurl }
        } else {
            payload = { ...category_banner_info }
        }
        return await this.categoryBannerService.updateCategoryBanner(payload)
    }
}