import {LmsSchema} from "./schemas";
import { SubjectsModel } from "./SubjectsModel";

export class LMSModel {
    public map: Map<string, LmsSchema>;
    constructor() {
        this.map = new Map();
    }

    public add(subject: LmsSchema) {
        return new Promise((resolve, reject) => {
            const {id} = subject;
            if (!id) {
                throw new Error("id doesnt exist");
            }
            this.map.set(id, subject);
            resolve("Added a new subject");
        });
    }

    public remove(subject: SubjectsModel) {
        return new Promise((resolve, reject) => {
            const {id} = subject;
            if (!id) {
                throw new Error("id doesnt exist");
            }
            if (this.map.has(id)) {
                this.map.delete(id);
                resolve("Subject removed");
            } else {
                reject("We don't have a subject with this id");
            }
        });
    }

    public verify(subject: SubjectsModel) {
        return new Promise((resolve, reject) => {
            const {id} = subject;
            if (!id) {
                throw new Error("id doesnt exist");
            }
            resolve(this.map.has(id));
        });
    }

    public readAll() {
        return new Promise((resolve, reject) => {
            resolve ([...this.map.values()]);
        });
    }
}
