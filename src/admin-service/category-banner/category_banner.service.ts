import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class CategoryBannerService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly categoryBannerService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }

    // Get all category banners
    async getAllCategoryBanners() {
        const response = await lastValueFrom(this.categoryBannerService.send('get_all_category_banners', {}))
        return this.errorHanleService.handleErrors(response)
    }
    // Create category banner
    async createCategoryBanner(category_banner_info: any) {
        const response = await lastValueFrom(this.categoryBannerService.send('create_category_banner', category_banner_info))
        return this.errorHanleService.handleErrors(response)
    }

    // update category banner
    async updateCategoryBanner(category_banner_info: any) {
        const response = await lastValueFrom(this.categoryBannerService.send('update_category_banner', category_banner_info))
        return this.errorHanleService.handleErrors(response)
    }
}