// If the form is for update, in the select, the input with name equal in the DB,
// the option is selected.
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

// in the course table the follows inputs has more attributes
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

// If the form his method is PUT, this adds a input hidden with the id to edit.
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

// print the inputs (type elements: input, select, textarea,)
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

// If the form has PUT method, this loads row data for add it at form for edit it
const getDataUpdate=async(table,id)=>{
    let request = await fetch(`http://localhost:8080/api/${table}/${id}`);
    let data = await request.json();
    return data;
}

// This function generates the form specified by parameters
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
export const changeToForm=async(method,idPUT=null)=>{
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

// This function shows the form for update or add item.
export const showForm=async(table,method,title,idCourse=undefined,idPUT)=>{
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
