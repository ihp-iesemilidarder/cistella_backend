import {getCookie} from './Utils.js';
import {coursesList} from "./FrontOffice.js";
const buttonsAdmin= document.querySelector("#buttons-admin");
const containerAdmin = document.querySelector("div#containerAdmin");
const containerThemeCourse = document.querySelector("body #themeCourse");

const buttonsTablesAdmin=(action)=>{
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

const printColumnsTable=(keys)=>{
    let output = "";
    keys.forEach(key=>{
        if(key!="id"){
            output+=`
                <th>${key.replace(new RegExp("[A-Z]")," $&")}</th>
            `;            
        }
    });
    return output;
}

const printValuesTable=(values)=>{
    let output="";
    values.forEach(el=>{
        output+="<tr>";
        let value = Object.values(el);
        let id = value[0];
        if(typeof id == "number") delete value[0];
        value.forEach(el=>{
            output+=`<td>${el}</td>`;
        });
        output+=`
            <td class="icons" style="font-size: 1.5em;display: flex;justify-content: space-between;">
                <i class="fas fa-edit" data-id="${id}" style="color:rgb(41, 44, 243);cursor: pointer;"></i>
                <i class="fas fa-trash" data-id="${id}" style="color:rgb(247, 76, 76);cursor: pointer;"></i>
            </td>
        `;
        output+="</tr>";
    });
    return output;
}

const deleteItemTable=(callback)=>{
    swal({
        title: "¿Estas seguro que quieres eliminarlo?",
        text: "Al aceptar eliminarás el registro y no habrá vuelta atras.",
        icon: "warning",
        buttons: true,
        dangerMode: true,                  
    }).then(ok=>{
        if(ok){
            callback();
        }else{
            swal({
                title:"ufff...",
                text:"menos mal que no lo he eliminado.",
                buttons:false
            });
            return false;
        }
    });
}

const printOptions=async(table)=>{
    let output="";
    let request = await fetch(`http://localhost:8080/api/${table}s`);
    let options = await request.json();
    await options.forEach(option=>{
        let name;
        let id;
        switch(table){
            case "teacher":
                name=`${option.name} ${option.firstSurname} ${option.secondSurname}`;
                id=option.id;
                break;
            case "category":
                name=option.name;
                id=option.id;
                break;
            case "profile":
                name=option.username;
                id=option.id;
                break;
            case "course":
                name=option.title;
                id=option.id;
                break;
            case "theme":
                name=option.theName;
                id=option.theId;
                break;
            }
            output+=`<option value="${id}">${name}</option>`;
    });    
    return output;
}

const setLabels=async(columns,dom)=>{
    columns.forEach(async column=>{
        let label = document.createElement("label");
        label.for=column[0];
        label.textContent=column[0];
        dom.appendChild(label);
        if(column[1]=="select"){
            null;
        }else{
            let input = document.createElement("input");
            input.type=column[1];
            input.name = column[0];
            input.setAttribute("class","u-full-width");
            input.placeholder=`type a ${column[0]}`;
            input.id=column[0];
            dom.appendChild(input);
        }
    });
}

const generateForm=async(columns)=>{
    try{
        containerAdmin.querySelector("table").remove();
    }catch{
        containerAdmin.querySelector("span").remove();
    }finally{
        let form = document.createElement("form");
        form.method="POST";
        form.id="form-add-table";
        containerAdmin.appendChild(form);
        setLabels(columns,containerAdmin.querySelector("form"));
        let submit = document.createElement("input");
        submit.type="button";
        submit.setAttribute("class","button-primary");
        submit.value="Insertar";
        containerAdmin.querySelector("form").appendChild(submit);
    }

}

const changeToForm=async(dom)=>{
    let nameTable = containerAdmin.dataset.table;
    let columns = {
        teachers:[
            ["name","text"],
            ["firstSurname","text"],
            ["secondSurname","text"]
        ],
        categories:[
            ["name","text"]
        ],
        profiles:[
            ["teacher","select"],
            ["username","text"],
            ["password","password"]
        ]
    }
    await generateForm(columns[nameTable]);
}

const insertDataTable=(table,elements)=>{
    let data = {};
    for(let element of elements){
        if(element.value!="Insertar") data[element.name]=element.value;
    }
    try{
        fetch(`http://localhost:8080/api/${table}`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            }
        });
        swal("Datos insertados correctamente","Los datos fueron insertados correctamente!!","success");        
    }catch{
        swal("Error inesperado","Error al insertar los datos en la tabla","error");
    }

}

const eventsAdmin=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("fa-times")){
        containerAdmin.removeAttribute("style");
        delete containerAdmin.dataset.table;
    }else if(dom.classList.contains("fa-trash")){
        deleteItemTable(()=>{
            fetch(`http://localhost:8080/api/${containerAdmin.dataset.table}/${dom.dataset.id}`,{
                method:"DELETE",
            }).then(el=>{
                if(el.status==500){
                    swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
                }else{
                    dom.parentNode.parentNode.remove();
                }
            });
        });
    }else if(dom.classList.contains("add-data-table")){
        dom.classList.replace("fa-plus","fa-eye");
        dom.classList.replace("add-data-table","view-data-table");
        changeToForm(dom);
    }else if(dom.classList.contains("view-data-table")){
        dom.classList.replace("fa-eye","fa-plus");
        dom.classList.replace("view-data-table","add-data-table");
        loadTable(dom.parentNode.dataset.table);
    }else if(dom.value=="Insertar"){
        insertDataTable(dom.parentNode.parentNode.dataset.table,dom.parentNode.elements);
    }
}

const printTable=(data)=>{
    if(data.length==0) return "<span>Table empty</span>";
    let output=[];
    data.map(el=>{
        if(el.teacher) el["teacher"] = `${el.teacher.name} ${el.teacher.firstSurname} ${el.teacher.secondSurname}`;
        if(el.password) delete el["password"];
        output.push(el);
    });
    let keys = Object.keys(output[0]);
    let values = Object.values(output);
    return `
        <table class="u-full-width">
            <thead>
                <tr>
                    ${printColumnsTable(keys)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${printValuesTable(values)}
            </tbody>
        </table>
    `;
}

const showData=(data,table)=>{
    containerAdmin.style.display="block";
    containerAdmin.innerHTML=`
        <i class="fas fa-times"></i>
        <h3>${table}</h3>
        ${printTable(data)}
        <i class="fas fa-plus add-data-table"></i>
    `;
}

const loadTable=async(table)=>{
    let request = await fetch(`http://localhost:8080/api/${table}`);
    let data = await request.json();
    showData(data,table);
}

const eventsButtons=async(e)=>{
    let dom = e.target;
    if(dom.nodeName=="BUTTON" && dom.id=="profesores"){
        containerAdmin.dataset.table="teachers";
        await loadTable("teachers");
    }else if(dom.nodeName=="BUTTON" && dom.id=="categorias"){
        containerAdmin.dataset.table="categories";
        await loadTable("categories");
    }else if(dom.nodeName=="BUTTON" && dom.id=="usuarios"){
        containerAdmin.dataset.table="profiles";
        await loadTable("profiles");
    }
}

const buttonsDeleteCourses=(action)=>{
    let courses = coursesList.querySelectorAll("#list-content .card .info-card span.admin-card");
    courses.forEach(course=>{
        if(action=="show"){
            let id = course.parentNode.querySelector(".showTheme").dataset.id;
            course.innerHTML=`
                <a href="#" class="u-full-width button-primary button input editar-curso" data-id="${id}">Editar Curso</a>
                <a href="#" class="u-full-width button-primary button input eliminar-curso" data-id="${id}">Eliminar Curso</a>
            `;               
        }else if(action=="delete"){
            course.innerHTML=``;
        }
    })
    
}

const removeCourse=async(dom)=>{
    deleteItemTable(()=>{
        fetch(`http://localhost:8080/api/courses/${dom.dataset.id}`,{
            method:"DELETE",
        }).then(el=>{
            if(el.status==500){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                dom.parentNode.parentNode.parentNode.remove();
            }
        });
    });
}

const deleteCourse=async(e)=>{
    let dom = e.target;
    if(dom.classList.contains("eliminar-curso")){
        await removeCourse(dom);
    }
}

const getUsername=async(name)=>{
    let request = await fetch("http://localhost:8080/api/profiles/");
    let data = await request.json();
    let ok = data.find(profile=>profile.username==name);
    return (ok)?true:false;
}

const checkSession=async()=>{
    setInterval(async()=>{
        let cookieName = getCookie("username");
        let ok = await getUsername(cookieName);
        if(!ok) adminDelete();
    },2000);
}

const adminDelete=()=>{
    buttonsDeleteCourses("delete");
    buttonsTablesAdmin("delete");
    buttonLogout("delete");
}

const buttonLogout=(action)=>{
    if(action=="show"){
        let login = document.querySelector("header i#login");
        login.classList.replace("fa-sign-in-alt","fa-sign-out-alt");
        login.id="logout";
        login.title="logout";
    }else if(action=="delete"){
        let logout = document.querySelector("header i#logout");
        logout.classList.replace("fa-sign-out-alt","fa-sign-in-alt");
        logout.id="login";
        logout.title="login";
    }
}

export const buttonDelete=(id,idTheme)=>{
    if(getCookie("username")==undefined && getUsername(getCookie("username"))) return "";
    return `
        <i class="fas fa-times delete-theme" data-id="${id}" data-idtheme="${idTheme}"></i>
    `;
}

const deleteTheme=(dom,id,idTheme)=>{
    deleteItemTable(()=>{
        fetch(`http://localhost:8080/api/couxthes/${id}`,{
            method:"DELETE",
        }).then(el=>{
            if(el.status==500){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                fetch(`http://localhost:8080/api/themes/${idTheme}`,{
                    method:"DELETE",
                }).then(el=>{
                    if(el.status==500){
                        swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
                    }else{
                        dom.parentNode.remove();
                    }
                });
            }
        });
    });
}

const eventsThemesCourse=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("delete-theme")){
        deleteTheme(dom,dom.dataset.id,dom.dataset.idtheme);
    }
}

export const BackOffice=async()=>{
    if(getCookie("username")==undefined && getUsername(getCookie("username"))) return null;
    buttonsTablesAdmin("show");
    buttonsDeleteCourses("show");
    buttonLogout("show");
    await checkSession();
    containerThemeCourse.addEventListener("click",eventsThemesCourse);
    containerAdmin.addEventListener("click",eventsAdmin);
    buttonsAdmin.addEventListener("click",await eventsButtons);
    coursesList.addEventListener("click",await deleteCourse);
}