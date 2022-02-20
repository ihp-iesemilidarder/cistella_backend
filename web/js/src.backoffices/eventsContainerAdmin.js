import { fetchApi } from "../Utils.js";
import {changeToForm} from "./showForm.js";
import {loadTable} from "./eventsButtonsAdmin.js";

// Find a theme by his title in the DB
const findThemeByTitle=async(title)=>{
    let request = await fetch(`http://localhost:8080/api/themes/search/${title}`);
    let data  =await request.json();
    return data.id;
}

// Event if the user clicks 'Insertar' in the form and the table is couxteas,
// executes this function
const addThemeInCourse=(body,dataFixed)=>{
    let order = body.order;
    delete body.order;
    try{
        fetch(`http://localhost:8080/api/themes`,{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-type":"application/json"
            }
        }).then(request=>request.json())
        .then(async data=>{
            if(data.status==500 || data.statusText){
                swal("Error inesperado","Error al insertar los datos en la tabla","error");
            }else{
                console.log(data);
                let idTheme = await findThemeByTitle(data.title);
                let body = {
                    course:{id:dataFixed},
                    theme:{id:idTheme},
                    order:order
                }
                console.log(body);
                fetch("http://localhost:8080/api/couxthes",{
                    method:"POST",
                    body:JSON.stringify(body),
                    headers:{
                        "Content-type":"application/json"
                    }
                });
                swal("Añadido correctamente","Temario añadido correctamente al curso","success");
            }
        });        
    }catch{
        swal("Error inesperado","Error al insertar los datos en la tabla","error");
    }
}

// Event for button 'Insertar' in form
const insertUpdateDataTable=(table,elements,dataFixed="",idPUT=null)=>{
    let data = {};
    if(table=="couxteas"){
        data.course=dataFixed
    }
    if(idPUT!=null){
        data.id=idPUT;
    }
    for(let element of elements){
        if(element.value=="") return swal("Hay campos vacios","Debes de rellenar todo el formulario","warning");
        if(element.value!="Insertar"){
            if(element.name=="teacher" && table=="profiles"){
                data["id"]=element.value;
                data[element.name]={
                    id:element.value
                }
            }else{
                data[element.name]=element.value;
            }
        }
    }
    console.log(data);
    // If the user adds themes in one course
    if (table=="couxthes") return addThemeInCourse(data,dataFixed);
    try{
        fetch(`http://localhost:8080/api/${table}`,{
            method:(idPUT!=null)?"PUT":"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            }
        }).then(request=>request.json())
        .then(data=>{
            if(data.status==500 || data.statusText){
                swal("Error inesperado","Error al insertar los datos en la tabla","error");
            }else{
                swal("Datos insertados correctamente","Los datos fueron insertados correctamente!!","success");
            }
        });        
    }catch{
        swal("Error inesperado","Error al insertar los datos en la tabla","error");
    }

}

// This function delete all the rows in one table
const deleteAll=(table,dom)=>{
    fetchApi(()=>{
        fetch(`http://localhost:8080/api/${table}/all`,{
            method:"DELETE",
        }).then(el=>{
            if(el.status==500 || el.statusText){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                dom.querySelector("table").remove();
                dom.innerHTML+="<span>Table empty</span>";
            }
        });
    },"¿Estas seguro que quieres eliminar todos los datos de la tabla?","Al aceptar eliminarás todos los registros y no habrá vuelta atras.");
}

// This function delete one table row
const deleteItem=(table,dom)=>{
    fetchApi(()=>{
        fetch(`http://localhost:8080/api/${table}/${dom.dataset.id}`,{
            method:"DELETE",
        }).then(el=>{
            if(el.status==500 || el.statusText){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                dom.parentNode.parentNode.remove();
            }
        });
    },"¿Estas seguro que quieres eliminarlo?","Al aceptar eliminarás el registro y no habrá vuelta atras.");    
    if(table=="profiles"){
        fetch(`http://localhost:8080/api/teachers/`);
    }
}

// Here there are the popup tables' events
export const eventsAdmin=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("fa-times")){
        containerAdmin.removeAttribute("style");
        delete containerAdmin.dataset.table;
    }else if(dom.classList.contains("deleteAll")){
        deleteAll(containerAdmin.dataset.table,containerAdmin);
    }else if(dom.classList.contains("fa-trash")){
        deleteItem(containerAdmin.dataset.table,dom);
    }else if(dom.classList.contains("add-data-table")){
        dom.classList.replace("fa-plus","fa-eye");
        dom.classList.replace("add-data-table","view-data-table");
        changeToForm("POST");
    }else if(dom.classList.contains("fa-edit")){
        containerAdmin.querySelector(".add-data-table").classList.replace("fa-plus","fa-eye");
        containerAdmin.querySelector(".add-data-table").classList.replace("add-data-table","view-data-table");
        changeToForm("PUT",dom.dataset.id);
    }else if(dom.classList.contains("view-data-table")){
        dom.classList.replace("fa-eye","fa-plus");
        dom.classList.replace("view-data-table","add-data-table");
        loadTable(dom.parentNode.dataset.table);
    }else if(dom.value=="Insertar"){
        let table = dom.parentNode.parentNode.dataset.table;
        let elements = dom.parentNode.elements;
        let dataFixed = containerAdmin.querySelector("input[type='hidden']").value;
        let idPUT=null;
        try{
            idPUT = containerAdmin.querySelector("form input[name='idPUT']").value;
        }catch{idPUT=null};
        insertUpdateDataTable(table,elements,dataFixed,idPUT);
    }
}