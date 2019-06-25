import { GroupsModel } from "./GroupsModel";
import { LMSModel } from "./LMSModel";
import { GradebookSchema, LmsSchema, RecordSchema, RecordSchemaInit} from "./schemas";
import { TeachersModel } from "./TeachersModel";

export class GradebooksModel {

    public gradebook: Map <string, GradebookSchema>;
    public data: {
        groups: GroupsModel,
        lms: LMSModel,
        teachers: TeachersModel,
    };
    public records: RecordSchemaInit;
    constructor(groups: GroupsModel, teachers: TeachersModel, lms: LMSModel) {
        this.gradebook = new Map();
        this.data = {
            groups,
            lms,
            teachers,
        };
        this.records = {};
    }

    public add(level: number, id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.data.groups.groups.has(id) === false) {
                reject("group id required");
            } else {
                this.gradebook.set(id ,
                    {
                        id,
                        level,
                        pupils: [],
                    });
                resolve(id);
            }
        });
    }
    public clear() {
        return new Promise((resolve) => {
                this.gradebook.clear();
                this.data.groups.groups.clear();
                this.data.lms.map.clear();
                this.data.teachers.map.clear();
                this.records = {};
                resolve("Clear!");
        });
    }

    public addRecord(gradebookId: string, record: RecordSchema) {
        this.records = record;
        return new Promise((resolve, reject) => {
            if (!this.gradebook.has(gradebookId)) {
                reject ("This id doesn't exist in the database");
            } else {
                let fullName: string;
                const groupsDir = this.data.groups.groups.get(gradebookId);
                if (!groupsDir) {
                    throw new Error("group directory doesn't exist");
                }
                const pupilGroup = groupsDir.pupils;
                if (!pupilGroup) {
                    throw new Error("group directory doesn't exist");
                }
                for (const pupil of pupilGroup) {
                    if (pupil.id === record.pupilId) {
                        fullName = pupil.name.first + " " + pupil.name.last;
                    }
                }

                const teacherName = this.data.teachers.map.get(record.teacherId);
                if (!teacherName) {
                    throw new Error("group directory doesn't exist");
                }
                const subjectDir = this.data.lms.map.get(record.subjectId);
                if (!subjectDir) {
                    throw new Error("group directory doesn't exist");
                }
                const newObj = {
                    // @ts-ignore: fullname is really assigned before being used
                    name: fullName,
                    records: [
                      {
                        lesson: record.lesson,
                        mark: record.mark,
                        subject: subjectDir.title,
                        teacher: teacherName.name.first + " " + teacherName.name.last,
                      },
                    ],
                };
                const students = this.gradebook.get(gradebookId);
                if (!students) {
                    throw new Error("student doesn't exist");
                }
                students.pupils.push(newObj);
                resolve("Student records updated");
            }
        });
    }

    public read(gradebookId: string, pupilId: string) {
        return new Promise ((resolve, reject) => {
            const students = this.gradebook.get(gradebookId);
            if (!students) {
                throw new Error("student doesn't exist");
            }
            const pupils = students.pupils;
            for (const pupil of pupils) {
                if (pupilId === this.records.pupilId) {
                    resolve(pupil);
                } else {
                    reject("Incorrect id");
                }
            }
        });
    }

    public readAll(gradebookId: string) {
        return new Promise ((resolve, reject) => {
            if (!this.gradebook.has(gradebookId)) {
                reject ("This id doesn't exist in the database");
            } else {
                const students = this.gradebook.get(gradebookId);
                if (!students) {
                    throw new Error("students don't exist");
                }
                resolve(students.pupils);
            }
        });
    }
}
