import { TeachersSchema } from "./schemas";

export class TeachersModel {
    public map: Map<string, TeachersSchema>;
    constructor() {
        this.map = new Map();
    }

    public add(data: TeachersSchema): Promise<string> {
        return new Promise((resolve) => {
            const id = Math.random().toString();
            this.map.set(id, data);
            resolve (id);
        });
    }

    public read(id: string) {
        return new Promise ((resolve, reject) => {
            if (!this.map.has(id)) {
                reject ("This id doesn't exist in the database");
            } else {
                const data = this.map.get(id);
                if (!data) {
                    throw new Error("data is undefined");
                }
                data.id = id;
                resolve(data);
            }
        });
    }

    public update(id: string, newProfile: TeachersSchema) {
        return new Promise((resolve, reject) => {
            if (!this.map.has(id)) {
                reject("This id doesn't exist in the database");
            }
            const oldProfile = this.map.get(id);
            const updatedProfile: TeachersSchema = {...oldProfile, ...newProfile};
            this.map.set(id, updatedProfile);
            resolve(id);
      });
    }

    public remove(id: string) {
      return new Promise((resolve, reject) => {
        if (this.map.has(id)) {
          this.map.delete(id);
          resolve("Teacher has been removed from the database");
        } else {
          reject("We don't have a teacher with this id");
        }
      });
    }
}
