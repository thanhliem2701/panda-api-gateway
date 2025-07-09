import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ErrorHandleService } from "src/common/utils/error-handling";

@Injectable()
export class SideMenuService {
    constructor(
        @Inject('ADMIN_SERVICE') private readonly sideMenuService: ClientProxy,
        private readonly errorHanleService: ErrorHandleService,
    ) { }
    //Get all menus
    async getAllMenus() {
        const response = await lastValueFrom(this.sideMenuService.send("get_all_menus", {}))
        return this.errorHanleService.handleErrors(response)
    }
    //create new side menu
    async createSideMenu(menu_info: any) {
        const response = await lastValueFrom(this.sideMenuService.send("create_side_menu", menu_info))
        return this.errorHanleService.handleErrors(response)
    }
    //update side menu
    async updateSideMenu(menu_info: any) {
        const response = await lastValueFrom(this.sideMenuService.send("update_side_menu_info", menu_info))
        return this.errorHanleService.handleErrors(response)
    }
}