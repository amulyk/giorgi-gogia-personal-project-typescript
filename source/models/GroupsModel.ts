import {GroupSchema, PupilsSchema} from "./schemas";

export class GroupsModel {
    public groups: Map<string, GroupSchema>;
    constructor() {
        this.groups = new Map();
    }

    public add(roomNumber: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const id = Math.random().toString();
            const room = roomNumber;
            const pupils: [] = [];
            const data = {
                id,
                pupils,
                room,
            };
            this.groups.set(id, data);
            resolve(id);
        });
    }

    public read(id: string) {
        return new Promise((resolve, reject) => {
            if (!this.groups.has(id)) {
                reject ("This id doesn't exist in the database");
            } else {
                resolve(this.groups.get(id));
            }
        });
    }

    public addPupil(groupId: string, pupil: PupilsSchema) {
        return new Promise((resolve, reject) => {
            if (!this.groups.has(groupId)) {
                reject ("This id doesn't exist in the database");
            } else {
                const group = this.groups.get(groupId);
                if (!group) {
                    throw new Error("group doesn't exist");
                }
                if (!group.pupils) {
                    throw new Error("pupils don't exist");
                }
                group.pupils.push(pupil);
                resolve("Added a new pupil");
            }
        });
    }

    public removePupil(groupId: string, pupilId: string) {
        return new Promise((resolve, reject) => {
            const group = this.groups.get(groupId);
            for (const key in group) {
                if (key === "pupils") {
                    if (!group.pupils) {
                        throw new Error("pupils don't exist");
                    }
                    for (let j = 0; j < group.pupils.length; j++) {
                        if (group.pupils[j].id === pupilId) {
                            group.pupils.splice(j, 1);
                            resolve("Removed the pupil");
                        } else {
                            reject("Pupil doesn't exist in the database");
                        }
                    }
                }
            }
        });
    }

    public update(id: string, newProfile: {room: number}) {
        return new Promise((resolve, reject) => {
            if (!this.groups.has(id)) {
                reject("This id doesn't exist in the database");
            }
            const oldProfile = this.groups.get(id);
            this.groups.set(id, {...oldProfile, ...newProfile});
            resolve(id);
      });
    }

    public readAll() {
        return new Promise((resolve) => {
            resolve([...this.groups.values()]);
        });
    }
}
