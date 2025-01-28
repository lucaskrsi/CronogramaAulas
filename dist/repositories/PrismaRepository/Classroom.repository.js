"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Usuario_1 = require("../../models/Usuario");
const Class_1 = require("../../models/Class");
const Professor_1 = require("../../models/Professor");
const Classroom_1 = require("../../models/Classroom");
const ClassSubject_1 = require("../../models/ClassSubject");
class ClassroomRepository {
    create(classroom) {
        return __awaiter(this, void 0, void 0, function* () {
            let classroomPrisma = yield client_1.prisma.classroom.create({
                data: {
                    name: classroom.getName(),
                    classroomPeriod: classroom.getClassroomPeriod(),
                    classroomCapacity: classroom.getClassroomCapacity(),
                    hours: classroom.getHours(),
                    classSubjectId: classroom.getClassSubject().getId(),
                    classId: classroom.getClass().getId(),
                    professorId: classroom.getProfessor().getId()
                },
            });
            classroom.setId(classroomPrisma.id);
            return classroom;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const classroomPrisma = yield client_1.prisma.classroom.findUnique({
                where: {
                    id: id,
                },
                include: {
                    professor: {
                        include: {
                            user: true,
                        }
                    },
                    classSubject: true,
                    class: true,
                }
            });
            if (!classroomPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Classroom not found");
            }
            const classroom = new Classroom_1.Classroom(classroomPrisma.name, classroomPrisma.classroomPeriod, classroomPrisma.classroomCapacity, new Professor_1.Professor(new Usuario_1.User(classroomPrisma.professor.user.name, classroomPrisma.professor.user.email, classroomPrisma.professor.user.password, classroomPrisma.professor.user.role, classroomPrisma.professor.user.id), classroomPrisma.professor.professorNumber, classroomPrisma.professor.id), new ClassSubject_1.ClassSubject(classroomPrisma.classSubject.name, classroomPrisma.classSubject.id), classroomPrisma.hours, new Class_1.Class(classroomPrisma.class.name, classroomPrisma.class.id), classroomPrisma.id);
            return classroom;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const classroomPrisma = yield client_1.prisma.classroom.findMany({
                include: {
                    professor: {
                        include: {
                            user: true,
                        }
                    },
                    classSubject: true,
                    class: true,
                }
            });
            Classroom_1.Classroom.classroomList = classroomPrisma.map((classroomObject) => {
                return new Classroom_1.Classroom(classroomObject.name, classroomObject.classroomPeriod, classroomObject.classroomCapacity, new Professor_1.Professor(new Usuario_1.User(classroomObject.professor.user.name, classroomObject.professor.user.email, classroomObject.professor.user.password, classroomObject.professor.user.role, classroomObject.professor.user.id), classroomObject.professor.professorNumber, classroomObject.professor.id), new ClassSubject_1.ClassSubject(classroomObject.classSubject.name, classroomObject.classSubject.id), classroomObject.hours, new Class_1.Class(classroomObject.class.name, classroomObject.class.id), classroomObject.id);
            });
            return Classroom_1.Classroom.classroomList;
        });
    }
    update(id, name, classroomPeriod, classroomCapacity, hours, professor, classObject, classSubject) {
        return __awaiter(this, void 0, void 0, function* () {
            let classroomPrisma = yield this.get(id);
            if (!classroomPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Classroom not found");
            }
            let classroomObject = yield client_1.prisma.classroom.update({
                where: {
                    id: classroomPrisma.getId(),
                },
                data: {
                    name: (typeof name == "string") ? name : classroomPrisma.getName(),
                    classroomPeriod: (typeof classroomPeriod == "string") ? classroomPeriod : classroomPrisma.getClassroomPeriod(),
                    classroomCapacity: (typeof classroomCapacity === "number") ? classroomCapacity : classroomPrisma.getClassroomCapacity(),
                    hours: (typeof hours === "number") ? hours : classroomPrisma.getHours(),
                    professorId: (professor && typeof professor.getId === "string") ? professor.getId() : classroomPrisma.getProfessor().getId(),
                    classId: (classObject && typeof classObject.getId === "string") ? classObject.getId() : classroomPrisma.getClass().getId(),
                    classSubjectId: (classSubject && typeof classSubject.getId === "string") ? classSubject.getId() : classroomPrisma.getClassSubject().getId(),
                }
            });
            classroomPrisma.setName(classroomObject.name);
            return classroomPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let classroomPrisma = yield this.get(id);
            if (!classroomPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Classroom not found");
            }
            let classroom = yield client_1.prisma.classroom.delete({
                where: {
                    id: classroomPrisma.getId(),
                }
            });
            return classroom.id.toString();
        });
    }
}
exports.ClassroomRepository = ClassroomRepository;
