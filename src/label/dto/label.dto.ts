import {IsString, Length} from "class-validator";

export class LabelDto {

    @IsString({message: 'Название должно быть строкой'})
    @Length(1, 60, {message: 'Название должно содержать не меньше 1 и не больше 60 символов'})
    readonly title: string;

}