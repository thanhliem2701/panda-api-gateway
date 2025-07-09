import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class TopBannerService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly topBannerService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }

    // Get all top banners
    async getAllTopBanners() {
        const response = await lastValueFrom(this.topBannerService.send('get_all_top_banners', {}))
        return this.errorHanleService.handleErrors(response)
    }

    // Create top banner
    async createTopBanner(top_banner_info: any) {
        const response = await lastValueFrom(this.topBannerService.send('create_top_banner', top_banner_info))
        return this.errorHanleService.handleErrors(response)
    }

    // update top banner
    async updateTopBanner(top_banner_info: any) {
        const response = await lastValueFrom(this.topBannerService.send('update_top_banner', top_banner_info))
        return this.errorHanleService.handleErrors(response)
    }
}