import {getCookie} from './Utils.js';

const buttonsAdmin= document.querySelector("#buttons-admin");
const containerAdmin = document.querySelector("div#containerAdmin");

const showButtons=()=>{
    buttonsAdmin.innerHTML+=`
        <button id="profesores">Profesores</button>
        <button id="categorias">Categorias</button>
        <button id="usuarios">Usuarios</button>
    `;
}

const showItemsTeachers=(list)=>{
    let output = "";
    list.forEach(el=>{
        output+=`
            <tr>
                <td>${el.teaName}</td>
                <td>${el.teaSurname1}</td>
                <td>${el.teaSurname2}</td>
                <td class="actions">
                    <i class="fas fa-trash" data-id="${el.teaId}"></i>
                    <i class="fas fa-edit" data-id="${el.teaId}"></i>
                </td>
            </tr>
        `;
    });
    return output;
}

const showItemsCategories=(list)=>{
    let output = "";
    list.forEach(el=>{
        output+=`
            <tr>
                <td>${el.catName}</td>
                <td class="actions">
                    <i class="fas fa-trash" data-id="${el.catName}"></i>
                    <i class="fas fa-edit" data-id="${el.catName}"></i>
                </td>
            </tr>
        `;
    });
    return output;
}

const deleteItemTable=(dom)=>{
    if(containerAdmin.dataset.table=="teachers"){
        fetch(`http://localhost:8080/api/profiles/${dom.id}`,{
            method:"DELETE",
            body:JSON.stringify({proId:dom.id}),
            headers: {
            'content-type' : 'application/json'
            }
        });
    }
    fetch(`http://localhost:8080/api/${containerAdmin.dataset.table}/${dom.id}`,{
        method:"DELETE",
        body:JSON.stringify({proId:dom.id}),
        headers: {
            'content-type' : 'application/json'
        }
    });
    dom.parentNode.parentNode.remove();
}

const eventsAdmin=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("fa-times")){
        containerAdmin.removeAttribute("style");
        delete containerAdmin.dataset.table;
    }else if(dom.classList.contains("fa-trash")){
        deleteItemTable(dom);
    }
}

const showTeachers=(teachers)=>{
    containerAdmin.style.display="block";
    containerAdmin.innerHTML=`
        <i class="fas fa-times"></i>
        <h3>Teachers</h3>
        <table class="u-full-width">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            ${showItemsTeachers(teachers)}
        </tbody>
      </table>
    `;
}

const showCategories=(categories)=>{
    containerAdmin.style.display="block";
    containerAdmin.innerHTML=`
        <i class="fas fa-times"></i>
        <h3>Categories</h3>
        <table class="u-full-width">
        <thead>
          <tr>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            ${showItemsCategories(categories)}
        </tbody>
      </table>
    `;
}

const loadTeachers=async()=>{
    let request = await fetch('http://localhost:8080/api/teachers');
    let data = await request.json();
    showTeachers(data);
}

const loadCategories=async()=>{
    let request = await fetch('http://localhost:8080/api/categories');
    let data = await request.json();
    showCategories(data);
}

const eventsButtons=async(e)=>{
    let dom = e.target;
    if(dom.nodeName=="BUTTON" && dom.id=="profesores"){
        containerAdmin.dataset.table="teachers";
        await loadTeachers();
    }else if(dom.nodeName=="BUTTON" && dom.id=="categorias"){
        containerAdmin.dataset.table="categories";
        await loadCategories();
    }
}

export const BackOffice=async()=>{
    if(getCookie("username")==undefined) return null;
    showButtons();
    containerAdmin.addEventListener("click",eventsAdmin);
    buttonsAdmin.addEventListener("click",await eventsButtons);
}