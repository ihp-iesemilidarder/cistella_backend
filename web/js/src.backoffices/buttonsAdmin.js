import { buttonsAdmin } from '../BackOffice.js';
import { coursesList } from '../FrontOffice.js';
// show the buttons for does CRUD in the teachers,categories and users
export const buttonsTablesAdmin=(action)=>{
    if(action=="show"){
        buttonsAdmin.innerHTML+=`
            <button id="profesores">Profesores</button>
            <button id="categorias">Categorias</button>
            <button id="usuarios">Usuarios</button>
        `;        
    }else{
        buttonsAdmin.innerHTML="";
    }
}

// Here the admin buttons for each course (card). Show it or hidden it 
export const buttonsAdminCourses=(action)=>{
    let buttonsAdmin = coursesList.querySelectorAll("#list-content .card .info-card span.admin-card");
    buttonsAdmin.forEach(course=>{
        if(action=="show"){
            let id = course.parentNode.querySelector(".showTheme").dataset.id;
            course.innerHTML=`
                <a href="#" class="u-full-width button-primary button input editar-curso" data-id="${id}">Editar Curso</a>
                <a href="#" class="u-full-width button-primary button input eliminar-curso" data-id="${id}">Eliminar Curso</a>
            `;             
        }else if(action=="delete"){
            course.innerHTML=``;
        }
    });
    let buttonsThemes = coursesList.querySelectorAll("#list-content .card .info-card div.add-theme");
    buttonsThemes.forEach(el=>{
        if(action=="show"){
            el.innerHTML+=`<i class='fas fa-plus button-add-theme' title='Añadir tema nuevo al curso'></i>`;
        }else if(action=="delete"){
            el.innerHTML="";
        }
        
    });
    
}

// This function hides or show the button for add a course
export const buttonAddCourse=(action)=>{
    if(action=="show"){
        coursesList.innerHTML+="<i class='fas fa-plus' id='buttonAddCourse'></i>";
    }else if(action=="delete"){
        try{
            coursesList.querySelector("i.fa-plus").remove();
        }catch{null};
    }
}

//// This functions are for hides or show the delete button of each course ////
//////////////////////////////////////////////////////////////////////////////
////// This funcion checks if the table exists
const existData=async(table)=>{
    try{
        let request = await fetch(`http://localhost:8080/api/${table}`);
        let data = await request.json();
        return (data.length>0)?true:false;        
    }catch{
        return false;
    }
}
////// main
export const buttonDeleteCourses=async(action)=>{
    if(action=="show"){
        if(!await existData("courses")) return false;
        buttonsAdmin.innerHTML+=`<i class="fas fa-trash" id="deleteAllCourses" title="Eliminar todos los cursos"></i>`;      
    }else if(action=="delete"){
        if(await existData("courses")) return false;
        buttonsAdmin.querySelector("i").remove();
    }
}

// This function shows or hides the buttons for add a teacher or theme in the current course
export const buttonsRelationshipsTeachers=(action,type)=>{
    let courses = coursesList.querySelectorAll(".card");
    courses.forEach(course=>{
        if(type=="delete"){
            let teachers = course.querySelectorAll(".profesor");
            teachers.forEach(teacher=>{
                if(action=="show"){
                    teacher.innerHTML+="<i class='fas fa-times deleteTeacher' style='color:red;font-size:1em;margin:0 1%;cursor:pointer;'></i>";
                }else if(action=="delete"){
                    try{teacher.querySelector("i.fa-times").remove()}catch{null};
                }
            });            
        }else if(type=="add"){
            let div = course.querySelector("div.profesores+div");
            if(action=="show"){
                div.innerHTML="<i class='fas fa-plus add-teacher'></i>";
            }else if(action=="delete"){
                div.innerHTML="";
            }
        }

    });
}