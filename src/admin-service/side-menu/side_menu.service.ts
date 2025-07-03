import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class SideMenuService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly sideMenuService: ClientProxy
    ) { }

    //Get all menus
    async getAllMenus() {
        const response = await lastValueFrom(this.sideMenuService.send("get_all_menus", {}))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;
        return data;
    }

    //create new side menu
    async createSideMenu(menu_info: any) {
        const response = await lastValueFrom(this.sideMenuService.send("create_side_menu", menu_info))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data } = response;
        return data;
    }

    //update side menu
    async updateSideMenu(menu_info: any) {
        const response = await lastValueFrom(this.sideMenuService.send("update_side_menu_info", menu_info))
        if (!response.success) {
            throw new BadRequestException({ message: response.messages })
        }
        const { success: _, ...data} = response;
        return data;
    }
}