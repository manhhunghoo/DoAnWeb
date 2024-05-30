import { StatusCodes } from "http-status-codes";
import { courseService } from "~/services/courseService";
import { userService } from "~/services/userService";
import { userController } from "./userController";
import { courseModel } from "~/models/Khoahoc/courseModel";
import { studentModel } from "~/models/studentModel";
import { itemModel } from "~/models/Khoahoc/itemModel";
import { teacherModel } from "~/models/teacherModel";
import { GET_DB } from "~/config/mongodb";
import { ExplainVerbosity, ObjectId } from "mongodb";

// Tao khoa hoc by Teacher
const createNewCoursebyAdmin = async (req, res, next) => {
  try {
    const findtest = await teacherModel.findOneByEmail(req.body.owner);
    if (findtest) {
      let modified = {
        ...req.body,
        owner: String(findtest._id),
      };
      console.log("modified:", modified);
      const createdItem = await courseService.createNew(modified);
      if (!createdItem) {
        console.log("createdItem:", createdItem);
        return res.status(StatusCodes.FAILED_DEPENDENCY).json({
          messenger: "Khong tao duoc khoa hoc hoac khoa hoc da ton tai",
        });
      } else {
        console.log("createditem:", createdItem);
        const pushintoteacher = await teacherModel.pushCourseintoTeacher(
          req.body.owner,
          String(createdItem._id)
        );
      }
      return res.status(StatusCodes.OK).json(createdItem);
    }
    return res
      .status(StatusCodes.FAILED_DEPENDENCY)
      .json({ messenger: "Loi khong tao duoc khoa hoc" });
  } catch (error) {
    next(error);
  }
};

// Lay danh sach lop hoc Do giao vien mo lop
const getDetailsCourseAllbyAdmin = async (req, res, next) => {
  try {
    const coures = await courseModel.getDetailsAll();
    if (coures.length > 0) {
      res.status(StatusCodes.OK).json(coures);
    } else {
      res.json({}).send({ message: "Khong co lop nao duoc tim thay" });
    }

    const listcourse = await courseModel.getDetailsAll();
    return res.status(StatusCodes.OK).json(listcourse);
  } catch (error) {
    next(error);
  }
};

// Update thong tin khoa hoc
const updateCourseByAdmin = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await courseService.updateCourse(courseId, req.body);

    res.status(StatusCodes.OK).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// Lay khoa hoc tu chinh Id cua no, thong tin khoa hoc
const getDetailsCoursebyTeacher = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await courseService.getDetails(courseId);
    res.status(StatusCodes.OK).json(course);
  } catch (error) {
    next(error);
  }
};

const getListCourseofTeacher = async (req, res, next) => {
  try {
    // truyen vao id giao vien
    const listcourse = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .find({
        owner: req.params.id, // id giao vien
      })
      .toArray();
    res.status(StatusCodes.OK).json(listcourse);
  } catch (error) {
    next(error);
  }
};

// -> truyền về cái id
// Lay danh sach hoc sinh tu cai lop do
const getSclassStudents = async (req, res) => {
  try {
    var students = await studentModel.findCourse(req.params.id);
    if (students.length > 0) {
      res.status(StatusCodes.OK).json(students);
    } else {
      res.send({ message: "No students found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Lay danh sach lop hoc cua 1 sinh vien
const getListCoursesofStudentid = async (req, res, next) => {
  try {
    // truyen vao id hocsinh
    const lsitcourseofstudent = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(req.params.id) }, { course: 1 });

    const courseIds = lsitcourseofstudent.course.map(
      (courseId) => new ObjectId(courseId)
    );

    const courses = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .find({ _id: { $in: courseIds } })
      .toArray();

    res.status(StatusCodes.OK).json(courses);
  } catch (err) {
    next(err);
  }
};

// Thuc hien xao 1 lop va loai bo id cua lop do trong hoc sinh
const deleteCoursebyAdmin = async (req, res, next) => {
  try {
    // Kiem tra coi co ton tai khong
    const deletedClass = await courseModel.findOneById(req.params.id);
    console.log(deletedClass);
    if (!deletedClass) {
      return res.send({ message: "Class not found" });
    }
    // Lưu ý cái bự mà xóa thì toàn bộ cái nhỏ bị xóa dùng deleteMany
    // Cái nhỏ xóa thì sẽ xóa cái đó ra khỏi cái bự là được . updateMany
    const deletedStudents = await studentModel.deletedOneCourse(req.params.id);
    //Xoa list item
    const deletedSubjects = await itemModel.deleteItemOfCourse(req.params.id);
    const deletedTeachers = await teacherModel.deleteOneCourse(req.params.id);
    const deletedClasss = await courseModel.findIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).send({ message: "Da xoa thanh cong" });
  } catch (error) {
    next(error);
  }
};

const getListStudentofCoures = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc
    const studentList = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .find({ course: req.params.id })
      .toArray();
    return res.status(StatusCodes.OK).json(studentList);
  } catch (error) {
    next(error);
  }
};
const getListStudentofCouresbyItem = async (itemid) => {
  try {
    // truyen vao id khoa hoc
    const studentList = await GET_DB()
      .collection(itemModel.ITEM_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(itemid) }, { courseCode: 1 });
    const liststudent = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .find({ course: studentList.courseCode })
      .toArray();
    console.log("studentList", liststudent);
    return liststudent;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteOneItem = async (idItem) => {
  try {
    // truyen vao id item
    const deletedItem = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .updateOne(
        {
          listitem: idItem,
        },
        {
          $pull: { listitem: idItem },
        }
      );
  } catch (error) {
    throw new Error(error);
  }
};
const pushStudentsIntoCourse = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc va id cua hoc sinh
    const student = await studentModel.findOneById(req.params.idstudent);
    if (!student) {
      return res
        .status(StatusCodes.FAILED_DEPENDENCY)
        .send({ message: " Khong tim thay sinh vien" });
    }
    const pushStudent = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateOne(
        { _id: ObjectId(req.params.idstudent) }, // Điều kiện tìm kiếm tài liệu
        {
          $push: {
            course: req.params.idcourse,
            examResult: {
              coursename: req.params.idcourse,
              markObtain: 0,
              hoanthanh: false,
            },
          },
        }
      );
    return pushStudent;
  } catch (error) {
    next(error);
  }
};
const pushStudentIntoCourse = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc va id cua hoc sinh
    const student = await studentModel.findOneByEmail(req.params.email);
    if (!student) {
      return res
        .status(StatusCodes.FAILED_DEPENDENCY)
        .send({ message: " Khong tim thay sinh vien" });
    }
    const pushStudent = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateOne(
        { email: req.params.email }, // Điều kiện tìm kiếm tài liệu
        {
          $addToSet: {
            course: req.params.idcourse,
            examResult: {
              coursename: req.params.idcourse,
              markObtain: 0,
              hoanthanh: false,
            },
          },
        }
      );
    return res.status(StatusCodes.OK).json(pushStudent);
  } catch (error) {
    next(error);
  }
};

const getListCourseStudentDone = async (req, res, next) => {
  try {
    //truyen vao id hoc sinh
    const lsitcourseofstudent = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(req.params.id) }, { course: 1 });

    const courseIds = lsitcourseofstudent.course.map(
      (courseId) => new ObjectId(courseId)
    );

    const courses = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .find({ _id: { $in: courseIds } })
      .project({ _id: 1 })
      .toArray();

    const courseId = courses.map((course) => course._id);
    const listcourse = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(req.params.id),
          },
        },
        {
          $unwind: "$examResult",
        },
        {
          $match: { "examResult.hoanthanh": true },
        },
        {
          $project: {
            _id: 0,
            coursename: "$examResult.coursename",
          },
        },
      ])
      .toArray();
    const coursename = listcourse.map((course) => course.coursename);
    console.log(coursename);
    const detail = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .find({ _id: { $in: coursename } })
      .toArray();
    return res.status(StatusCodes.OK).json(detail);
  } catch (error) {
    next(error);
  }
};
const chamdiemchoStudent = async (req, res, next) => {
  try {
    //truyen vao id hoc sinh va id mon hoc va diem so
    const student = await studentModel.findOneById(req.params.idstudent);
    if (!student) {
      return res
        .status(StatusCodes.FAILED_DEPENDENCY)
        .send({ message: "Khong tim thay hoc sinh" });
    }
    const updateMark = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(req.params.idstudent),
          "examResult.coursename": new ObjectId(req.params.idcourse),
        },
        {
          $set: {
            "examResult.$.markObtain": req.params.diemso,
            "examResult.$.hoanthanh": true,
          },
        }
      );
    return res.status(StatusCodes.OK).json(updateMark);
  } catch (error) {
    next(error);
  }
};

const getOneCoursebyTeacher = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc va id teacher
    const course = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(req.params.idcourse),
        owner: req.params.idteacher,
      });
    console.log(course);
    if (!course) {
      return res
        .status(StatusCodes.FAILED_DEPENDENCY)
        .send({ message: "Khong ton tai yeu cau" });
    }
    const courseone = await courseModel.findOneById(req.params.idcourse);
    return res.status(StatusCodes.OK).json(courseone);
  } catch (error) {
    next(error);
  }
};

const FindCourseOnSearch = async (req, res, next) => {
  try {
    // truyen vao cac key can tim kiem
    const articles = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .find({ title: { $regex: req.query.q, $options: "i" } })
      .toArray();
    return res.json(articles);
  } catch (error) {
    next(error);
  }
};

const AddListStudentOnCourse = async (req, res, next) => {
  try {
    // truyen vao id course
    const courseId = req.params.id;
    const finder = await courseModel.findOneById(courseId);
    const students = JSON.parse(req.query.students);
    const length = students.length;
    const update1 = await GET_DB()
      .collection(courseModel.COURSE_COLLECTION_NAME)
      .updateMany(
        {
          _id: new ObjectId(courseId),
        },
        {
          $set: {
            memberof: finder.memberof + length,
          },
        }
      );

    const update = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateMany(
        { email: { $in: students } },
        {
          $addToSet: {
            course: String(courseId),
            examResult: {
              coursename: new ObjectId(courseId),
              markObtain: 0,
              hoanthanh: false,
            },
          },
        }
      );
    return res.status(StatusCodes.OK).json(update);
  } catch (error) {
    next(error);
  }
};

const getMarkOfCourse = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc va id hoc sinh
    const getmark = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(req.params.idstudent),
        "examResult.coursename": new ObjectId(req.params.idcourse),
      });
    if (getmark) {
      const markExam = getmark.examResult.find(
        (item) => item.coursename == req.params.idcourse
      );
      if (markExam) {
        const diemso = markExam.markObtain;
        return res.json({ diemso: diemso });
      } else {
        return res.json({ diemso: null });
      }
    } else {
      return res.json({ diemso: null });
    }
  } catch (error) {
    next(error);
  }
};
const deleteStudentFromCourse = async (req, res, next) => {
  try {
    // truyen vao id khoa hoc va id hoc sinh
    const student = await studentModel.findOneById(req.params.idstudent);
    if (!student) {
      return res
        .status(StatusCodes.FAILED_DEPENDENCY)
        .send({ message: "Khong tim thay sinh vien" });
    }
    const deletecourse = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(req.params.idstudent),
          course: { $in: [req.params.idcourse] },
        },
        {
          $pull: {
            course: req.params.idcourse,
            examResult: { coursename: req.params.idcourse },
          },
        }
      );
    return res.status(StatusCodes.OK).json(deletecourse);
  } catch (error) {
    next(error);
  }
};

// Xoa tat cac cac lop ma do teacher tao
const deleteCoursesbyAdmin = async (req, res, next) => {
  try {
    const teacher = await teacherModel.findOneById(req.params.id);
    if (teacher.teachCourse.length == 0) {
      return res.send({ message: "No classes found to delete" });
    }
    var arraycourseddelete = teacher.teachCourse;
    console.log("teacher.teachCourse", teacher.teachCourse);
    const deletedStudents = await GET_DB()
      .collection(studentModel.USER_COLLECTION_NAME)
      .updateMany(
        { course: { $in: [arraycourseddelete] } },
        { $pull: { $in: [arraycourseddelete] } }
      );
    console.log("deletedstudent", deletedStudents);
    const deletedSubjects = await GET_DB()
      .collection(itemModel.ITEM_COLLECTION_NAME)
      .deleteMany({ course: new Object(req.params.id) });

    return res.status(StatusCodes.OK).json(deletedSubjects);
  } catch (error) {
    next(error);
  }
};

export const courseController = {
  //Danh cho admin
  createNewCoursebyAdmin, // truyen vao data
  getDetailsCourseAllbyAdmin, // khong truyen
  deleteCoursebyAdmin, // truyen vao id course
  deleteCoursesbyAdmin, // truyen vao id giao vien - xoa toan bo khoa hoc giao vien
  updateCourseByAdmin, // truyen vao id course
  pushStudentIntoCourse, // idstudent va idcourse
  deleteStudentFromCourse, // truyen idStudent va idcourse

  //Danh cho teacher
  getOneCoursebyTeacher, // truyen vao idcourse va idteacher: lay thong tin 1 khoa hoc cua gv
  getListStudentofCoures, // truyen vao id khoa hoc
  getListCourseofTeacher, // truyen vao id giao vien
  chamdiemchoStudent, // truyen vao id hoc sinh, id mon hoc va diem so
  deleteOneItem, // truyen voa id item
  AddListStudentOnCourse,
  getListStudentofCouresbyItem,

  //Ham xuat phat tu hoc sinh
  getListCoursesofStudentid, // truyen vao id hoc sinh
  getListCourseStudentDone, // truyen vao id hoc sinh
  getMarkOfCourse, // truyen vao id hoc sinh va id khoa hoc
  FindCourseOnSearch,
};
