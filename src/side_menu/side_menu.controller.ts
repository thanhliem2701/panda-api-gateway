import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SideMenuService } from './side_menu.service';

@Controller()
export class SideMenuController {
  constructor(private readonly sideMenuService: SideMenuService) { }

  //admin control area
  @Get('admin/side-menu')
  getAdminAllSideMenu() {
    return this.sideMenuService.getAdminAllSideMenu();
  }


  // @Post('admin/side-menu')
  // create(@Body() createSideMenuDto: CreateSideMenuDto) {
  //   return this.sideMenuService.create(createSideMenuDto);
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sideMenuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSideMenuDto: UpdateSideMenuDto) {
  //   return this.sideMenuService.update(+id, updateSideMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sideMenuService.remove(+id);
  // }
}
