import {getCookie,getUsername} from './Utils.js';
import {coursesList} from "./FrontOffice.js";
import { buttonsTablesAdmin,buttonsAdminCourses,buttonAddCourse,buttonDeleteCourses,buttonsRelationshipsTeachers } from './src.backoffices/buttonsAdmin.js';
import {buttonLogout,checkSession} from "./src.backoffices/session.js";
import {eventsButtons} from "./src.backoffices/eventsButtonsAdmin.js";
import { eventsListCourses } from './src.backoffices/eventsListCourses.js';
import { eventsAdmin } from './src.backoffices/eventsContainerAdmin.js';
import { eventsThemesCourse } from './src.backoffices/eventsThemesCourse.js';

export const buttonsAdmin= document.querySelector("#buttons-admin");
const containerAdmin = document.querySelector("div#containerAdmin");
const containerThemeCourse = document.querySelector("body #themeCourse");

export const BackOffice=async()=>{
    if(getCookie("username")==undefined && getUsername(getCookie("username"))) return null;
    buttonsTablesAdmin("show");
    buttonsAdminCourses("show");
    buttonLogout("show");
    await checkSession();
    containerThemeCourse.addEventListener("click",eventsThemesCourse);
    containerAdmin.addEventListener("click",eventsAdmin);
    buttonsAdmin.addEventListener("click",await eventsButtons);
    coursesList.addEventListener("click",await eventsListCourses);
    await buttonDeleteCourses("show");
    buttonAddCourse("show");
    buttonsRelationshipsTeachers("show","delete");
    buttonsRelationshipsTeachers("show","add");
}