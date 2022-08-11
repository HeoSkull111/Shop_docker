import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import {Shop} from 'src/models/shop.model';
import {ShopService} from 'src/services/shop/shop.service';
@Controller('shop')
export class ShopController {
    constructor(private shopSerive: ShopService) {}
    @Get("/")
    getItemByID(@Query("id") id: string) {
        if (id == undefined) {
            throw new BadRequestException("id is required");
        }
        return this.shopSerive.getItemByID(id);
    }

    @Get("/all")
    getAllItems() {
        return this.shopSerive.getAllItems();
    }

    @Post("/")
    addItem(@Body() item: Shop) {
        return this.shopSerive.addItem(item);
    }

    @Put("/")
    updateItem(@Body() item: Shop) {
        return this.shopSerive.updateItem(item.id,item);
    }
    @Delete("/")
    deleteItem(@Query("id") id: string) {
        return this.shopSerive.deleteItem(id);
    }

}

