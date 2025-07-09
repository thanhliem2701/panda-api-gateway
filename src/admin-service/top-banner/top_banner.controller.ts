import { Controller, Get, Body, Post, UseInterceptors, UploadedFile, Put } from "@nestjs/common";
import { TopBannerService } from "./top_banner.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { S3Service } from 'src/common/aws/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('top-banner')
export class TopBannerController {
    constructor(
        private readonly topBannerService: TopBannerService,
        private readonly s3Service: S3Service,
    ) { }

    // Get all top banners
    @Get('/top-banners')
    async getAllTopBanners() {
        return await this.topBannerService.getAllTopBanners()
    }

    // Create top banner
    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createTopBanner(@UploadedFile() file: Express.Multer.File, @Body() top_banner_info: any) {
        let payload: any;
        if (file) {
            const imgurl = await this.s3Service.uploadFile(file);
            payload = { ...top_banner_info, imgurl }
        } else {
            payload = { ...top_banner_info }
        }
        return await this.topBannerService.createTopBanner(payload)
    }

    // Update top banner
    @Put('/update')
    @UseInterceptors(FileInterceptor('file'))
    async updateTopBanner(@UploadedFile() file: Express.Multer.File, @Body() top_banner_info: any) {
        let payload: any;
        if (file) {
            const imgurl = await this.s3Service.uploadFile(file);
            payload = { ...top_banner_info, imgurl }
        } else {
            payload = { ...top_banner_info }
        }
        return await this.topBannerService.updateTopBanner(payload)
    }
}