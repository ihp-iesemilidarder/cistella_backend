import {getCookie} from './Utils.js';

const buttonsAdmin= document.querySelector("#buttons-admin");
const containerTeachers = document.querySelector("div#containerTeachers");
const containerCategories = document.querySelector("div#containerCategories");
const containerProfiles = document.querySelector("div#containerProfiles");

const showButtons=()=>{
    buttonsAdmin.innerHTML+=`
        <button id="profesores">Profesores</button>
        <button id="categorias">Categorias</button>
        <button id="usuarios">Usuarios</button>
    `;
}

const showTeachers=(teachers)=>{
    containerTeachers.style.display="block";
    containerTeachers.innerHTML='';
    containerTeachers.innerHTML+=`
        
    `;
}

const loadTeaachers=async()=>{
    let request = await fetch('http://localhost:8080/api/teachers');
    let data = await request.json();
    if(data){
        showTeachers(data);
    }
}

export const BackOffice=async()=>{
    if(getCookie("username")==undefined) return null;
    showButtons();
    await loadTeaachers();
}