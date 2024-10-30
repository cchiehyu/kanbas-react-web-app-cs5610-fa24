import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

export { courses, modules, assignments, users, enrollments };

export function unenrollCourse(_id: string, courseId: string): any {
  throw new Error('Function not implemented.');
}
