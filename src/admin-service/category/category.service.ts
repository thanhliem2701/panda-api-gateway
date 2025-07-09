import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class CategoryService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly categoryService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }
    //get all categories
    async getAllCategories() {
        const response = await lastValueFrom(this.categoryService.send("get_all_categories", {}))
        return this.errorHanleService.handleErrors(response)
    }

    //get category by id
    async getCategoryById(id: string) {
        const response = await lastValueFrom(this.categoryService.send("get_category_by_id", { id }))
        return this.errorHanleService.handleErrors(response)
    }

    //get Category by name
    async getCategoryByName(name: string) {
        const response = await lastValueFrom(this.categoryService.send("get_category_by_name", { name }))
        return this.errorHanleService.handleErrors(response)
    }

    // Create category
    async createCategory(category_info: any) {
        const response = await lastValueFrom(this.categoryService.send('create_new_category', category_info))
        return this.errorHanleService.handleErrors(response)
    }

    // Update category
    async updateCategory(category_info: any){
        const response = await lastValueFrom(this.categoryService.send('update_category', category_info))
        return this.errorHanleService.handleErrors(response)
    }
}