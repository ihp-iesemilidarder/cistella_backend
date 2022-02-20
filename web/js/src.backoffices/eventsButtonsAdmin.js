import {fetchApi} from "../Utils.js";
import { coursesList } from "../FrontOffice.js";
import { buttonsAdmin } from "../BackOffice.js";
//// This function prints the table                                                                                  ////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This function show the popup content
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

// This function gets the table data
export const loadTable=async(table)=>{
    let request = await fetch(`http://localhost:8080/api/${table}`);
    let data = await request.json();
    showData(data,table);
}

// Here there are the events of buttons Admin
export const eventsButtons=async(e)=>{
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