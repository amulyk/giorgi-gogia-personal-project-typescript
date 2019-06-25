import {SubjectsSchema} from "./schemas";

export class SubjectsModel {
    public title: string;
    public lessons: number;
    public description: string;
    public id?: string;
    constructor(data: SubjectsSchema) {
        const {title, lessons, description} = data;
        this.title = title;
        this.lessons = lessons;
        this.description = description;
        this.id = String(this.lessons + Math.random());
    }
}
