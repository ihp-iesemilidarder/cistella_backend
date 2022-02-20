import { buttonDeleteCourses } from "./buttonsAdmin.js";
import { showForm } from "./showForm.js";
import { fetchApi } from "../Utils.js";

const removeCourse=async(dom)=>{
    fetchApi(()=>{
        fetch(`http://localhost:8080/api/courses/${dom.dataset.id}`,{
            method:"DELETE",
        }).then(async el=>{
            if(el.status==500 || el.statusText){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                dom.parentNode.parentNode.parentNode.remove();
                await buttonDeleteCourses("delete");
            }
        });
    },"¿Estas seguro que quieres eliminar el curso?","Al aceptar eliminarás el curso y no habrá vuelta atras.");
}

const removeTeacher=(dom,idCourse,idTeacher)=>{
    fetchApi(()=>{
        fetch(`http://localhost:8080/api/couxteas/${idCourse}/${idTeacher}`,{
            method:"DELETE",
        }).then(async el=>{
            if(el.status==500 || el.statusText){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                dom.parentNode.remove();
                await buttonDeleteCourses("delete");
            }
        });
    },"¿Estas seguro que quieres eliminar el profesor?","Al aceptar eliminarás el curso y no habrá vuelta atras.");
}

// Events for the buttons in each course (card)
export const eventsListCourses=async(e)=>{
    let dom = e.target;
    if(dom.classList.contains("eliminar-curso")){
        await removeCourse(dom);
    }else if(dom.classList.contains("editar-curso")){
        showForm("courses","PUT","Editar curso",undefined,dom.dataset.id);
    }else if(dom.classList.contains("deleteTeacher")){
        let idTeacher = dom.parentNode.dataset.id;
        let idCourse = dom.parentNode.parentNode.parentNode.parentNode.dataset.id;
        removeTeacher(dom,idCourse,idTeacher);
    }else if(dom.classList.contains("add-teacher")){
        let idCourse = dom.parentNode.parentNode.parentNode.dataset.id;
        await showForm("couxteas","POST","Profesores en el curso",idCourse);
    }else if(dom.classList.contains("button-add-theme")){
        let idCourse = dom.parentNode.parentNode.parentNode.dataset.id;
        await showForm("couxthes","POST","Temas en el curso",idCourse);
    }else if(dom.id=="buttonAddCourse"){
        await showForm("courses","POST","Añadir curso");
    }
}