import {PupilsSchema} from "./schemas";

export class PupilsModel {
    public map: Map<string, PupilsSchema>;
    constructor() {
        this.map = new Map();
    }

    public add(data: PupilsSchema): Promise<PupilsSchema> {
        return new Promise((resolve, reject) => {
            const id: string = Math.random().toString();
            data.id = id;
            this.map.set(id, data);
            resolve(data);
        });
    }

    public read(id: string) {
        return new Promise ((resolve, reject) => {
            if (!this.map.has(id)) {
                reject ("This id doesn't exist in the database");
            } else {
                resolve(this.map.get(id));
            }
        });
    }

    public update(id: string, newProfile: PupilsSchema) {
        return new Promise((resolve, reject) => {
            if (!this.map.has(id)) {
                reject("This id doesn't exist in the database");
            }
            const oldProfile = this.map.get(id);
            const updatedProfile: PupilsSchema = {...oldProfile, ...newProfile};
            this.map.set(id, updatedProfile);
            resolve(id);
      });
    }

    public remove(id: string) {
        return new Promise((resolve, reject) => {
            if (this.map.has(id)) {
              resolve(this.map.delete(id));
            } else {
              reject("We don't have a pupil with this id");
            }
        });
    }
}
