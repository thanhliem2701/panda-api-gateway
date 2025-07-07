import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CategoryService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly categoryService: ClientProxy
    ) { }
    //get all categories
    async getAllCategories() {
        const response = await lastValueFrom(this.categoryService.send("get_all_categories", {}))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;

        return data;
    }

    //get category by id
    async getCategoryById(id: string) {
        const response = await lastValueFrom(this.categoryService.send("get_category_by_id", { id }))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;

        return data;
    }

    //get Category by name
    async getCategoryByName(name: string) {
        const response = await lastValueFrom(this.categoryService.send("get_category_by_name", { name }))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;

        return data;
    }

    // Create category
    async createCategory(category_info: any) {
        const response = await lastValueFrom(this.categoryService.send('create_new_category', category_info))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;
        return data;
    }

    // Update category
    async updateCategory(category_info: any){
        const response = await lastValueFrom(this.categoryService.send('update_category', category_info))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;
        return data;
    }

}