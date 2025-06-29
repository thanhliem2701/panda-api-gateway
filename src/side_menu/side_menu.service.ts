import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SideMenuService {

  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminService: ClientProxy
  ) {}
  
  getAdminAllSideMenu() {
    const data = this.adminService.send("get_all_side_menu",{})
  }

  // create(createSideMenuDto: CreateSideMenuDto) {
  //   return 'This action adds a new sideMenu';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} sideMenu`;
  // }

  // update(id: number, updateSideMenuDto: UpdateSideMenuDto) {
  //   return `This action updates a #${id} sideMenu`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sideMenu`;
  // }
}
