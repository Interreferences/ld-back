import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {LabelService} from "./label.service";
import {LabelDto} from "./dto/label.dto";

@Controller('/api/labels')
export class LabelController {

    constructor(private labelService: LabelService) {}

    @Get()
    async getLabels(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10) {
        return this.labelService.getAllLabels(page, limit);
    }

    @Post()
    async createLabel(@Body() dto: LabelDto) {
        return this.labelService.createLabel(dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.labelService.findLabelById(id);
    }

    @Get('/search/:title')
    async getByTitle(
        @Param('title') title: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.labelService.findLabelsByTitle(title, page, limit);
    }

    @Patch(':id')
    async editLabel(
        @Param('id') id: number,
        @Body() dto: LabelDto
    ){
        return this.labelService.updateLabel(id, dto)
    }

    @Delete(':id')
    async deleteLabel(@Param('id') id: number){
        return this.labelService.deleteLabel(id)
    }

}
