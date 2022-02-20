import { getCookie,getUsername } from "../Utils.js";
import {buttonAddCourse,buttonsTablesAdmin,buttonsRelationshipsTeachers,buttonsAdminCourses} from "./buttonsAdmin.js";

// show/hide the logout button
export const buttonLogout=(action)=>{
    if(action=="show"){
        let login = document.querySelector("header i#login");
        login.classList.replace("fa-sign-in-alt","fa-sign-out-alt");
        login.id="logout";
        login.title="logout";
    }else if(action=="delete"){
        try{
            let logout = document.querySelector("header i#logout");
            logout.classList.replace("fa-sign-out-alt","fa-sign-in-alt");
            logout.id="login";
            logout.title="login";            
        }catch{null};
    }
}

// This function is throw when the session is expired, deleting all admin buttons 
const adminDelete=()=>{
    buttonsAdminCourses("delete");
    buttonsTablesAdmin("delete");
    buttonLogout("delete");
    buttonAddCourse("delete");
    buttonsRelationshipsTeachers("delete","delete");
    buttonsRelationshipsTeachers("delete","add");
}

// This checks the session, if this is false, deletes admin buttons
export const checkSession=async()=>{
    setInterval(async()=>{
        let cookieName = getCookie("username");
        let ok = await getUsername(cookieName);
        if(ok==false) adminDelete();
    },2000);
}