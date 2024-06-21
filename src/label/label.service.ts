import {Injectable, NotFoundException} from '@nestjs/common';
import {Label} from "./models/label.model";
import {InjectModel} from "@nestjs/sequelize";
import {LabelDto} from "./dto/label.dto";
import {Op} from "sequelize";

@Injectable()
export class LabelService {

    constructor(@InjectModel(Label) private labelRepository: typeof Label) {}

    async createLabel(dto: LabelDto){
        const label = await this.labelRepository.create(dto);
        return label;
    }

    async getAllLabels(page: number, limit: number) {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.labelRepository.findAndCountAll({
            offset,
            limit,
        });
        return {
            totalItems: count,
            labels: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };
    }


    async findLabelById(id: number) {
        const label = await this.labelRepository.findByPk(id);
        if (!label) {
            throw new NotFoundException(`Label with id ${id} not found`);
        }
        return label;
    }

    async findLabelsByTitle(title: string, page: number, limit: number) {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.labelRepository.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            },
            offset,
            limit,
        });
        if (!rows.length) {
            throw new NotFoundException(`Labels with title containing "${title}" not found`);
        }
        return {
            totalItems: count,
            labels: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };
    }

    async updateLabel(id: number, dto: LabelDto) {
        const label = await this.labelRepository.findByPk(id);
        if (!label) {
            throw new NotFoundException(`Label with id ${id} not found`);
        }

        await label.update(dto);
        return label;

    }

    async deleteLabel(id: number) {
        const label = await this.labelRepository.findByPk(id);
        if (!label) {
            throw new NotFoundException(`Label with id ${id} not found`);
        }
        await label.destroy();
        return { message: `Label with id ${id} has been deleted` };
    }
}
