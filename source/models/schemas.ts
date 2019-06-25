export interface PupilsSchema {
    id?: string;
    name: {
      first: string,
      last: string,
    };
    image: string;
    dateOfBirth: string;
    phones: Array<{
        phone: string,
        primary: boolean,
    }>;
    sex: "male" | "female"; // male OR female
    description: string;
}

export interface TeachersSchema {
    name: {
        first: string,
        last: string,
    };
    image: string;
    dateOfBirth: string;
    emails:
        Array<{
        email: string,
        primary: boolean,
        }>;
    phones:
        Array<{
        phone: string,
        primary: boolean,
        }>;
    sex: "male" | "female"; // male or female
    subjects:
        Array<{
        subject: string,
        }>;
    description: string;
    id?: string;
}

export interface SubjectsSchema {
    title: string;
    lessons: number;
    description: string;
}

export interface LmsSchema {
    title: string;
    lessons: number;
    description: string;
    id?: string;
}

export interface RecordSchema {
    pupilId: string;
    teacherId: string;
    subjectId: string;
    lesson: number;
    mark: number;
}

export interface RecordSchemaInit {
    pupilId?: string;
    teacherId?: string;
    subjectId?: string;
    lesson?: number;
    mark?: number;
}

export interface GradebookSchema {
    id: string;
    level: number;
    pupils: FinalRecordSchema[];
}

export interface FinalRecordSchema {
    name: string;
    records: Array<{
        lesson: number,
        mark: number,
        subject: string,
        teacher: string,
      }>;
}

export interface GroupSchema {
    id?: string;
    pupils?: PupilsSchema[];
    room: number;
}

export interface PupilsSchemaUpdate {
    id?: string;
    name?: {
      first?: string,
      last?: string,
    };
    image?: string;
    dateOfBirth?: string;
    phones?: Array<{
        phone?: string,
        primary?: boolean,
    }>;
    sex?: "male" | "female"; // male OR female
    description?: string;
}

export interface TeachersSchemaUpdate {
    name?: {
        first?: string,
        last?: string,
    };
    image?: string;
    dateOfBirth?: string;
    emails?:
        Array<{
        email?: string,
        primary?: boolean,
        }>;
    phones?:
        Array<{
        phone?: string,
        primary?: boolean,
        }>;
    sex?: "male" | "female"; // male or female
    subjects?:
        Array<{
        subject?: string,
        }>;
    description?: string;
}
