import {
  GradebooksModel,
  GroupsModel,
  LMSModel,
  PupilsModel,
  SubjectsModel,
  TeachersModel,
} from "./models";

import {
  PupilsSchema,
  PupilsSchemaUpdate,
  RecordSchema,
  TeachersSchema,
  TeachersSchemaUpdate,
} from "./models/schemas";

const teacherData: TeachersSchema = {
  dateOfBirth: "11/12/1980",
  description: "description",
  emails:
  [{
    email: "email.com",
    primary: true,
  }],
  image: "img",
  name: {
    first: "Jack",
    last: "Black",
  },
  phones:
  [{
    phone: "123456",
      primary: false,
      }],
  sex: "male",
  subjects:
      [{
      subject: "history",
      }],
};

const teacherData2: TeachersSchema = {
  dateOfBirth: "12/23/1970",
  description: "description",
  emails:
  [{
    email: "email.net",
    primary: false,
  }],
  image: "img.jpg",
  name: {
    first: "Barry",
    last: "White",
  },
  phones:
  [{
    phone: "234123",
      primary: true,
      }],
  sex: "male",
  subjects:
      [{
      subject: "history",
      }],
};

const pupilData: PupilsSchema = {
  dateOfBirth: "10/20/1995", // format date
  description: "yes",
  image: "Face",
  name: {
    first: "Jon",
    last: "Doe",
  },
  phones: [
    {
      phone: "12345",
      primary: true,
    },
  ],
  sex: "male", // male OR female
};

const pupilData2: PupilsSchema = {
  dateOfBirth: "10/10/1997", // format date
  description: "no",
  image: "Face.jpg",
  name: {
    first: "Oliver",
    last: "White",
  },
  phones: [
    {
      phone: "42315",
      primary: false,
    },
  ],
  sex: "male", // male OR female
};

(async () => {
    // -----checking teacher

    const teachers = new TeachersModel();
    const teacherId: string = await teachers.add(teacherData);
    console.log(await teachers.read(teacherId));
    // await teachers.update(teacherId, teacherData2);
    // console.log(await teachers.read(teacherId));
    // console.log(teachers.remove(teacherId));

    // -----checking pupil

    const pupils = new PupilsModel();
    const pupil: PupilsSchema = await pupils.add(pupilData);
    if (!pupil.id) {
      throw new Error("pupil id is missing");
    }
    // console.log(pupil.id);
    // console.log(await pupils.read(pupil.id));
    // await pupils.update(pupil.id, pupilData2);
    // console.log(await pupils.read(pupil.id));
    // console.log(await pupils.remove(pupil.id));
    // console.log(await pupils.read(pupil.id));

    // -----checking LMS and Subject

    const history = new SubjectsModel({
      description: "hey",
      lessons: 24,
      title: "History",
    });
    // console.log(history);
    const lms = new LMSModel();
    console.log(await lms.add(history));
    // console.log(await lms.readAll());
    // console.log(await lms.verify(history));
    // console.log(await lms.remove(history));
    // console.log(await lms.readAll());

    // -----checking groups

    const room = 236;
    const groups = new GroupsModel();
    const groupId: string = await groups.add(room);
    console.log(groupId);
    // console.log(await groups.read(groupId));
    console.log(await groups.addPupil(groupId, pupil));
    // console.log(await groups.read(groupId));
    // console.log(await groups.removePupil(groupId, pupil.id));
    // console.log(await groups.update(groupId, {
    //     room: 237,
    // }));
    console.log(await groups.readAll());

    // -----checking gradebook

    if (!history.id) {
      throw new Error("history id is missing");
    }
    const pupilId = pupil.id;
    const gradebooks = new GradebooksModel(groups, teachers, lms);

    const level = 1;
    const gradebookId: string = await gradebooks.add(level, groupId);

    const record: RecordSchema = {
      lesson: 1,
      mark: 9,
      pupilId,
      subjectId: history.id,
      teacherId,
    };

    console.log(await gradebooks.addRecord(gradebookId, record));
    const oliver = await gradebooks.read(gradebookId, pupilId);
    console.log(oliver);
    const students = await gradebooks.readAll(gradebookId);
    console.log(students);
    console.log(await gradebooks.clear());
    console.log(gradebooks);
})();
