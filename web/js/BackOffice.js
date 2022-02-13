import {getCookie} from './Utils.js';
import {coursesList} from "./FrontOffice.js";
const buttonsAdmin= document.querySelector("#buttons-admin");
const containerAdmin = document.querySelector("div#containerAdmin");

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
    }
}

const printTable=(data)=>{
    if(data.length==0) return "Table empty";
    let output=[];
    data.map(el=>{
        if(el.teacher) delete el["teacher"];
        if(el.password) delete el["password"];
        output.push(el);
    });
    console.log(output);
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
    `
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
        let cookieName = document.cookie.split("=")[1];
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

export const BackOffice=async()=>{
    if(getCookie("username")==undefined) return null;
    buttonsTablesAdmin("show");
    buttonsDeleteCourses("show");
    buttonLogout("show");
    await checkSession();
    containerAdmin.addEventListener("click",eventsAdmin);
    buttonsAdmin.addEventListener("click",await eventsButtons);
    coursesList.addEventListener("click",await deleteCourse);
}