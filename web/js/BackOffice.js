import {getCookie,getUsername} from './Utils.js';
import {coursesList} from "./FrontOffice.js";
const buttonsAdmin= document.querySelector("#buttons-admin");
const containerAdmin = document.querySelector("div#containerAdmin");
const containerThemeCourse = document.querySelector("body #themeCourse");

// show the buttons for does CRUD in the teachers,categories and users
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

/////  This prints the tabla for show the items list of one table  /////
///////////////////////////////////////////////////////////////////////
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
        let editButton = (containerAdmin.dataset.table!="categories")?`<i class="fas fa-edit" data-id="${id}" style="color:rgb(41, 44, 243);cursor: pointer;"></i>`:``;
        output+=`
            <td class="icons" style="font-size: 1.5em;display: flex;justify-content: space-between;">
                ${editButton}
                <i class="fas fa-trash" data-id="${id}" style="color:rgb(247, 76, 76);cursor: pointer;"></i>
            </td>
        `;
        output+="</tr>";
    });
    return output;
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
                    <th style="text-align:center;"><i class="fas fa-trash deleteAll" style="
                        color:rgb(247, 76, 76);
                        text-content:center;
                        cursor:pointer;
                        font-size:1.5em;
                    "></i></th>
                </tr>
            </thead>
            <tbody>
                ${printValuesTable(values)}
            </tbody>
        </table>
    `;
}
////////////////////////////////////////////////////////////////////

// This function do a fetch (POST,PUT,DELETE,UPDATE)
const fetchApi=(callback,title,text)=>{
    swal({
        title: title,
        text: text,
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

///// This generates the form for add and update the rows in one table /////
///////////////////////////////////////////////////////////////////////////
const setSelectedOption=(element,table,name,dataPUT)=>{
    switch(table){
        case "teacher":
            let nameCompleteTeacher=`${dataPUT[table].name} ${dataPUT[table].firstSurname} ${dataPUT[table].secondSurname}`;
            if (name==nameCompleteTeacher) element.setAttribute("selected","selected");
            break;
        case "category":
            console.log(name);
            console.log(dataPUT[table]["name"]);
            if (name==dataPUT[table]) element.setAttribute("selected","selected");
            break;
        case "profile":
            if (name==dataPUT[table].username) element.setAttribute("selected","selected");
            break;
        case "course":
            if (name==dataPUT[table].title) element.setAttribute("selected","selected");
            break;
        case "theme":
            if (name==dataPUT[table].title) element.setAttribute("selected","selected");
            break;
    }
}

// Print the options of a select HTML
const printOptions=async(dom,table,dataPUT=null)=>{
    if(table=="category") table="categorie";
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
            case "categorie":
                name=option.name;
                id=option.name;
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
        let element = document.createElement("option");
        element.value = id;
        element.textContent = name;
        table=(table=="categorie")?"category":table;
        console.log(table);
        console.log(dataPUT);
        console.log(name);
        console.log(id);
        if(dataPUT!=null) setSelectedOption(element,table,name,dataPUT);
        dom.appendChild(element);
    });    
}

const inputsCourseForm=(dom,input)=>{
    switch(input){
        case "price":
            dom.setAttribute("step","0.01");
            dom.setAttribute("min","0");
            break;
        case "priceOffer":
            dom.setAttribute("step","0.01");
            dom.setAttribute("min","0");
            break;
        case "stars":
            dom.setAttribute("min","0");
            dom.setAttribute("max","5");
            break;

    }
}

const setInputPutForm=(dom,idPUT)=>{
    if(idPUT!=null){
        let inputIdPUT = document.createElement("input");
        inputIdPUT.type="hidden";
        inputIdPUT.name="idPUT";
        inputIdPUT.id="idPUT";
        inputIdPUT.value=idPUT;
        dom.appendChild(inputIdPUT);
    }
}

const setInputs=async(columns,dom,dataPUT=null)=>{
    let table = containerAdmin.dataset.table;
    columns.forEach(async column=>{
        let label = document.createElement("label");
        label.for=column[0];
        label.textContent=column[0];
        dom.appendChild(label);
        if(column[2]=="select"){
            let select = document.createElement("select");
            select.name = column[1];
            select.id=column[1];
            select.setAttribute("class","u-full-width");
            let option = document.createElement("option");
            option.value=" ";
            option.innerText=`-- Select a ${column[0]} --`;
            option.disabled="disabled";
            option.selected="selected";
            select.appendChild(option);
            printOptions(select,column[1],dataPUT);
            if(dom.parentNode.dataset.table=="courses") inputsCourseForm(select,column[1]);
            dom.appendChild(select);
        }else if(column[2]=="textarea"){
            let textarea = document.createElement("textarea");
            textarea.name = column[1];
            textarea.id = column[1];
            textarea.placeholder=`type a ${column[1]}`;
            textarea.setAttribute("class","u-full-width");
            if(dom.parentNode.dataset.table=="courses") inputsCourseForm(textarea,column[1]);
            (dataPUT!=null && column[1]!="password")?textarea.value=dataPUT[column[1]]:null;
            dom.appendChild(textarea);
        }else{
            let input = document.createElement("input");
            input.type=column[2];
            input.name = column[1];
            (dataPUT!=null && column[1]!="password")?input.value=dataPUT[column[1]]:null;
            input.setAttribute("class","u-full-width");
            input.placeholder=`type a ${column[1]}`;
            input.id=column[1];
            if(dom.parentNode.dataset.table=="courses") inputsCourseForm(input,column[1]);
            dom.appendChild(input);
        }
    });
}

const getDataUpdate=async(table,id)=>{
    let request = await fetch(`http://localhost:8080/api/${table}/${id}`);
    let data = await request.json();
    return data;
}

const generateForm=async(columns,method,idPUT=null)=>{
    try{
        containerAdmin.querySelector("table").remove();
    }catch{
        try{
            containerAdmin.querySelector("span").remove();
        }catch{
            throw "continue";
        }
    }finally{
        let form = document.createElement("form");
        form.method=method;
        form.id="form-add-table";
        containerAdmin.appendChild(form);
        let formElement = containerAdmin.querySelector("form");
        setInputPutForm(formElement,idPUT);
        let dataPUT = (idPUT!=null)?await getDataUpdate(containerAdmin.dataset.table,idPUT):null;
        setInputs(columns,formElement,dataPUT);
        let submit = document.createElement("input");
        submit.type="button";
        submit.setAttribute("class","button-primary");
        submit.value="Insertar";
        containerAdmin.querySelector("form").appendChild(submit);
    }
}

// Function that prints the form when the user clicks in edit-table button
const changeToForm=async(method,idPUT=null)=>{
    let nameTable = containerAdmin.dataset.table;
    let columns = {
        teachers:[
            ["Nombre","name","text"],
            ["Primer apellido","firstSurname","text"],
            ["Segundo apellido","secondSurname","text"]
        ],
        categories:[
            ["Nombre","name","text"]
        ],
        profiles:[
            ["Profesor","teacher","select"],
            ["Usuario","username","text"],
            ["Contraseña","password","password"]
        ],
        couxteas:[
            ["Profesor","teacher","select"]
        ],
        couxthes:[
            ["Titulo","title","text"],
            ["Descripcion","description","text"],
            ["Orden","order","number"]
        ],
        courses:[
            ["Titulo","title","text"],
            ["Descripcion","description","textarea"],
            ["Precio","price","number"],
            ["Precio rebajado","priceOffer","number"],
            ["Ruta de la imagen","img","text"],
            ["Fecha de inicio","dateStart","date"],
            ["Fecha de finalización","dateFinish","date"],
            ["Hora de inicio","scheduleStart","time"],
            ["Duracion de la clase","duration","time"],
            ["Puntuacion","stars","number"],
            ["Categoria","category","select"]
        ]
    }
    await generateForm(columns[nameTable],method,idPUT);
}

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

const findThemeByTitle=async(title)=>{
    let request = await fetch(`http://localhost:8080/api/themes/search/${title}`);
    let data  =await request.json();
    return data.id;
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
///////////////////////////////////////////////////////////////////////////

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
const eventsAdmin=(e)=>{
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

const showData=(data,table)=>{
    containerAdmin.style.display="block";
    containerAdmin.innerHTML=`
        <i class="fas fa-times"></i>
        <h3>${table}</h3>
        <input type='hidden' value='' disabled>
        ${printTable(data)}
        <i class="fas fa-plus add-data-table"></i>
    `;
}

const loadTable=async(table)=>{
    let request = await fetch(`http://localhost:8080/api/${table}`);
    let data = await request.json();
    showData(data,table);
}

// Here there are the events of buttons Admin
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
    }else if(dom.id=="deleteAllCourses"){
        fetchApi(()=>{
            fetch(`http://localhost:8080/api/courses/all`,{
                method:"DELETE",
            }).then(async el=>{
                if(el.status==500 || el.statusText){
                    swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
                }else{
                    coursesList.innerHTML='<i class="fas fa-plus" id="buttonAddCourse" aria-hidden="true"></i>';
                    buttonsAdmin.querySelector("i").remove();
                }
            });
        },"¿Estas seguro que quieres eliminar todos los cursos?","Si continuas, no habrá vuelta atrás.");
    }
}

// Here the admin buttons for each course (card). Show it or hidden it 
const buttonsAdminCourses=(action)=>{
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

const checkSession=async()=>{
    setInterval(async()=>{
        let cookieName = getCookie("username");
        let ok = await getUsername(cookieName);
        if(ok==false) adminDelete();
    },2000);
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

// show/hide the logout button
const buttonLogout=(action)=>{
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

export const buttonDelete=(id,idTheme)=>{
    if(getCookie("username")==undefined && getUsername(getCookie("username"))) return "";
    return `
        <i class="fas fa-times delete-theme" data-id="${id}" data-idtheme="${idTheme}"></i>
    `;
}

const deleteTheme=(dom,id,idTheme)=>{
    fetchApi(()=>{
        fetch(`http://localhost:8080/api/couxthes/${id}`,{
            method:"DELETE",
        }).then(el=>{
            if(el.status==500 || el.statusText){
                swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
            }else{
                fetch(`http://localhost:8080/api/themes/${idTheme}`,{
                    method:"DELETE",
                }).then(el=>{
                    if(el.status==500 || el.statusText){
                        swal("Vaya...","Parece que se produjo un error al querer eliminar el item. Puede que esta tabla esta relacionada con otra.","error");
                    }else{
                        dom.parentNode.remove();
                    }
                });
            }
        });
    },"¿Estas seguro que quieres eliminar el tema?","Al aceptar eliminarás el tema y no habrá vuelta atras.");
}

const eventsThemesCourse=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("delete-theme")){
        deleteTheme(dom,dom.dataset.id,dom.dataset.idtheme);
    }
}

const existData=async(table)=>{
    try{
        let request = await fetch(`http://localhost:8080/api/${table}`);
        let data = await request.json();
        return (data.length>0)?true:false;        
    }catch{
        return false;
    }
}

const buttonDeleteCourses=async(action)=>{
    if(action=="show"){
        if(!await existData("courses")) return false;
        buttonsAdmin.innerHTML+=`<i class="fas fa-trash" id="deleteAllCourses" title="Eliminar todos los cursos"></i>`;      
    }else if(action=="delete"){
        if(await existData("courses")) return false;
        buttonsAdmin.querySelector("i").remove();
    }
}

const buttonAddCourse=(action)=>{
    if(action=="show"){
        coursesList.innerHTML+="<i class='fas fa-plus' id='buttonAddCourse'></i>";
    }else if(action=="delete"){
        try{
            coursesList.querySelector("i.fa-plus").remove();
        }catch{null};
    }
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

const showForm=async(table,method,title,idCourse=undefined,idPUT)=>{
    containerAdmin.style.display="block";
    containerAdmin.dataset.table=table;
    let hiddenInput = (idCourse!=undefined)?`<input type="hidden" value="${idCourse}" disabled>`:"<input type='hidden' value=''>";
    containerAdmin.innerHTML=`
        <i class="fas fa-times"></i>
        <h3>${title}</h3>
        ${hiddenInput}
    `;
    await changeToForm(method,idPUT);
}

const eventsListCourses=async(e)=>{
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

const buttonsRelationshipsTeachers=(action,type)=>{
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
    //this is commented because there are a setInterval() in FrontOffice.js that loads the courses
    buttonAddCourse("show");
    buttonsRelationshipsTeachers("show","delete");
    buttonsRelationshipsTeachers("show","add");
}