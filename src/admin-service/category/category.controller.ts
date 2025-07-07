import { Controller, Get, Param, Post, Body, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    // Get all categories
    @Get("/categories")
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    // Get category by id
    @Get("/id/:id")
    async getCategoryById(@Param("id") id: string) {
        return this.categoryService.getCategoryById(id);
    }

    // Get category by name
    @Get("/search/:name")
    async getCategoryByName(@Param("name") name: string) {
        return this.categoryService.getCategoryByName(name);
    }

    // Create new category
    @Post('/create')
    async createCategory(@Body() category_info: any) {
        return this.categoryService.createCategory(category_info);
    }

    // Update category
    @Put('/update')
    async updateCategory(@Body() category_info: any) {
        return this.categoryService.updateCategory(category_info);
    }
}