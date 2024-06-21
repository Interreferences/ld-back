import {Column, DataType, Model, Table} from "sequelize-typescript";

interface LabelCreationAttrs {
    title: string;
}

@Table({tableName: 'labels', timestamps: false })
export class Label extends Model<Label, LabelCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;
}