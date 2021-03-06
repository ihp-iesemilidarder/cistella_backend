import { DateOperators, getCookie,getUsername} from "./Utils.js";
import { BackOffice } from "./BackOffice.js";
export const coursesList = document.querySelector("#list-content");
const search = document.querySelector("#buscador");
let coursesTrolley = JSON.parse(localStorage.getItem("coursesTrolley")) || [];
const Trolley = document.querySelector("#lista-carrito > tbody");
const numTrolley = document.querySelector("#num-cursos");
const buttonEmptyTrolley = document.querySelector("#vaciar-carrito");
const header = document.querySelector("header .row");
const buttonRegister = document.querySelector("i#icon-register");
const containerLogin = document.querySelector("form#loginForm");
const containerRegister = document.querySelector("form#registerForm");
const containerTheme = document.querySelector("div#themeCourse");
const closeTheme = containerTheme.querySelector("i.fa-times");
const closeLogin = containerLogin.querySelector("i.fa-times");
const closeRegister = containerRegister.querySelector("i.fa-times");

const emptyTrolley=(e) => {
    e.preventDefault();
    localStorage.removeItem("coursesTrolley");
    coursesTrolley = [];
    loadTrolley();
}

function deleteCourseTrolley(e){
    e.preventDefault();
    let node = e.target;
    if(!node.classList.contains("borrar-curso")) return false;
    let repeats = node.parentNode.parentNode.querySelector("#count").textContent;
    let id = node.getAttribute("data-id");
    let offert = parseInt(node.parentNode.parentNode.querySelector("#offert").textContent.replace("%",""));
    if(repeats == 1){
        coursesTrolley = coursesTrolley.filter(el => (el.id+el.offert[1]) != (id+offert));
    }else{
        coursesTrolley.map(el=>{
            if(el.id == id && el.offert[1] == offert){
                el.count--;
            }
        });
    }
    loadTrolley();
    localStorage.setItem("coursesTrolley",JSON.stringify(coursesTrolley));
}

function loadTrolley(){
    [Trolley.innerHTML, numTrolley.textContent] = ["",""];
    if(coursesTrolley.length == 0) return false;
    let count = 0;
    let priceTotalTolley = 0;
    coursesTrolley.forEach((course) => {
        count+=course.count;
        priceTotalTolley += (parseFloat(course.price)*course.count);
        let clase =(course.offert[1] == 0)?'style="display:none;"':"";
        console.log(course.teachers);
        Trolley.innerHTML += `
        <tr>
            <td><img src="${course.img}"></td>
            <td>${course.title}</td>
            <td>${course.teachers.toString()}</td>
            <td>${course.price}???</td>
            <td id="count">${course.count}</td>
            <td id="offert" ${clase}>${course.offert[1]}%</td>
            <td><a href="#" class="borrar-curso" data-id="${course.id}" > X </a></td>
        </tr>
        `;
    });
    numTrolley.textContent = count;
    Trolley.innerHTML += `
    <tr>
        <td><b>Total</b></td>
        <td>${priceTotalTolley}???</td>
    </tr>
    `;
}

function listTeachers(teachers){
    let list=[];
    teachers.forEach(teacher=>{
        list.push(teacher.textContent);
    });
    return list;
}

function addCourse(e){
    e.preventDefault();

    let courseElement;
    let buttonCourseElement;
    if(e.target.classList.contains("agregar-carrito")){
        courseElement = e.target.parentElement.parentElement; // abuelo
        buttonCourseElement = e.target;
    }else{
        return false;
    }

    let course = {
        img: courseElement.querySelector("img").src,
        id: buttonCourseElement.getAttribute("data-id"),
        title: courseElement.querySelector("h4").textContent,
        description: courseElement.querySelector(".descripcion").textContent,
        price: parseFloat(courseElement.querySelector(".precio > span").textContent.replace("???","")),
        teachers: listTeachers(courseElement.querySelectorAll(".profesor span")),
        count:1,
        offert: [courseElement.querySelector("#descuento").value.toUpperCase()],
        priceTotal: 0
    }
    if(course.offert[0] == "ESTUDIANTE"){
        course.price*=0.10;
        course.offert.push(10);
    }else if(course.offert[0] == "PARO"){
        course.price*=0.15;
        course.offert.push(15);
    }else{
        course.offert.push(0);
    }
    if(coursesTrolley.some(el => el.id == course.id && el.offert[1] == course.offert[1]) == false){
        course.priceTotal += course.price;
        coursesTrolley.push(course);
        localStorage.setItem("coursesTrolley",JSON.stringify(coursesTrolley));
        loadTrolley();
    }else{
        coursesTrolley.map(el => {
            if(el.id == course.id && el.offert[1] == course.offert[1]){
                el.count++;
                el.priceTotal = el.price * 2;
                localStorage.setItem("coursesTrolley",JSON.stringify(coursesTrolley));
            }
        });
        loadTrolley();
    }
}

const showListCoursesThemes=async(id)=>{
    let request = await fetch(`http://localhost:8080/api/couxthes`);
    let data = await request.json();
    data = data.filter(theme=>theme.course.id==id);
    return data;
}

const buttonDeleteTheme=(id,idTheme)=>{
    if(getCookie("username")==undefined && getUsername(getCookie("username"))) return "";
    return `
        <i class="fas fa-times delete-theme" data-id="${id}" data-idtheme="${idTheme}"></i>
    `;
}

const printSheet=async(id)=>{
    let couxthes = await showListCoursesThemes(id);
    containerTheme.querySelector("div").innerHTML="";
    couxthes.sort((a,b)=>a.order-b.order);
    couxthes.forEach(couxthe=>{
        containerTheme.querySelector("div").innerHTML+=`
            <div>
                ${buttonDeleteTheme(couxthe.id,couxthe.theme.id)}
                <h5><font color="red">${couxthe.order}.</font> ${couxthe.theme.title}</h5>
                <p>${couxthe.theme.description}</p>                
            </div>
        `;
    });
    if(couxthes.length==0) containerTheme.querySelector("div").innerHTML+="Este curso no tiene temas";
}

const showTheme=(e)=>{
    let node = e.target;
    if(node.classList.contains("showTheme")){
        printSheet(node.dataset.id);
        containerTheme.style="display:block";
    }
}

const postTeacher=async(teacher)=>{
    let request = await fetch("http://localhost:8080/api/teachers/register",{
        method:"POST",
        headers:new Headers({"content-type":"application/json"}),
        body:JSON.stringify(teacher)
    });
    return await request.json(); 
}

const postProfile=async(teacher,profile)=>{
    let body = {
        password:profile.password,
        username:profile.username
    }
    let requestTeacher = await fetch(`http://localhost:8080/api/teachers/search/${teacher.name}/${teacher.firstSurname}/${teacher.secondSurname}`);
    let teacherComplete = await requestTeacher.json();
    body.teacher = teacherComplete;
    body.id = teacherComplete.id;
    let requestProfile = await fetch("http://localhost:8080/api/profiles/register",{
        method:"POST",
        body: JSON.stringify(body),
        headers: new Headers({"content-type":"application/json"})
    })
    return await requestProfile.json();
}

const fetchsRegister=async(data)=>{
    let teacher = await postTeacher(data.teacher);
    if(teacher!=true){
        try{
            return swal(teacher.title,teacher.text,teacher.type);
        }catch{
            return swal("Error inesperado","No se pudo registrar los datos","error");
        }
        
    }
    let profile = await postProfile(data.teacher,data.profile);
    if(profile!=true){
        try{
            return swal(profile.title,profile.text,profile.type);
        }catch{
            return swal("Error inesperado","No se pudo registrar los datos","error");
        }
    }
}

const sendRegister=async()=>{
    let formData = {
        teacher:{
            name:containerRegister.querySelector('input[name="name"]').value,
            firstSurname:containerRegister.querySelector('input[name="surname1"]').value,
            secondSurname:containerRegister.querySelector('input[name="surname2"]').value            
        },
        profile:{
            username:containerRegister.querySelector('input[name="user"]').value,
            password:containerRegister.querySelector('input[name="password"]').value,            
        }
    }
    let againPassword = containerRegister.querySelector('input[name="againPassword"]').value;
    if(formData.teacher.name.length==0 && formData.teacher.name.length==0 && formData.teacher.name.length==0 && formData.teacher.name.length==0
        && formData.teacher.name.length==0 && formData.teacher.name.length==0){
        return swal("Ups...","Los campos estan vacios","warning");
    }else if(againPassword!=formData.profile.password){
        return swal("Ups...", "Las contrase??as no coinciden", "warning");
    }
    await fetchsRegister(formData);
}

const sendLogin=async()=>{
    let fields = {
        loginUsername:containerLogin.querySelector("input[name='user']").value,
        loginPassword:containerLogin.querySelector("input[name='password']").value
    }

    let request = await fetch(`http://localhost:8080/api/profiles/login`,{
        method:"POST",
        body:JSON.stringify(fields),
        headers: new Headers({"content-type":"application/json"})
    });
    let data = await request.json();
    if(data){
        document.cookie=`username=${fields.loginUsername};expires=${new DateOperators().increment(0,0,0,0,30,-1,-1)}`;
        swal("Login correcto","Te has logueado correctamente! Enhorabuena!","success");
        BackOffice();
    }else{
        swal("Ups...","Lo sentimos has puesto mal los datos o no estas registrado. Vuelvo a intentar","warning");
    }
}

const register=()=>{
    containerRegister.style="display:block";
    document.body.style = "overflow:hidden";
}

const events=async()=>{
    search.addEventListener("keyup",filterCourse);
    coursesList.addEventListener("click",addCourse);
    Trolley.addEventListener("click",deleteCourseTrolley);
    buttonEmptyTrolley.addEventListener("click",emptyTrolley);
    buttonRegister.addEventListener("click",register);
    header.addEventListener("click",loginLogout);
    closeLogin.addEventListener("click",(e)=>{
        containerLogin.reset();
        e.target.parentNode.parentNode.removeAttribute("style");
        document.body.removeAttribute("style");
    });
    closeTheme.addEventListener("click",(e)=>{
        e.target.parentNode.removeAttribute("style");
        document.body.removeAttribute("style");
    });
    closeRegister.addEventListener("click",(e)=>{
        containerRegister.reset();
        e.target.parentNode.parentNode.removeAttribute("style");
        document.body.removeAttribute("style");
    });
    coursesList.addEventListener("click",showTheme);
    containerRegister.querySelector("input[type='button']").addEventListener("click",await sendRegister);
    containerLogin.querySelector("input[type='button']").addEventListener("click",await sendLogin);
}

function filterCourse(e){
    e.preventDefault();
    let category = document.querySelector("select option:checked").value;
    loadCourses(category,(search.value != "")?search.value:null);
}

const printStars = (count)=>{
    let stars='';
    let dec = (count % 1 == 0)?false:true; // is decimal the number?
    for(let x = 1; x <= 5; x++){
        if(dec == false){
            stars += (x <= count)?`<img src="img/star.png">`:`<img src="img/star-empty.png">`;
        }else{
            if(x <= count){
                stars += `<img src="img/star.png">`;
            //As the number count is decimal, if the x is equal to count, the count incremment it and print the start-medium 
            }else if(x == Math.trunc(count)+1){
                stars += `<img src="img/star-medium.png">`;
            }else{
                stars += `<img src="img/star-empty.png">`;
            }
        }
    }
    return stars;
};

function printTeachers(teachers){
    let result = "";
    teachers.forEach(teacher=>{
        result+=`
            <p class="profesor" data-id="${teacher.id}"><i class="fas fa-user teacherIcon"></i><span>${teacher.name} ${teacher.firstSurname} ${teacher.secondSurname}</span></p>
        `;         
    });
    return result;
}

function printCourses(data) {
    coursesList.innerHTML = "";
    data.forEach(ob => {
        // I convert the values to upper case always for compare
        //this if conditional is if you have the setInterval() active.
        /*if(getCookie("username")!=undefined && getUsername(getCookie("username"))){
            coursesList.innerHTML += `
                <div class="card" data-id="${ob.id}">
                    <img src="img/${ob.img}" class="imagen-curso u-full-width">
                    <div class="info-card">
                        <h4>${ob.title}</h4>
                        <p class="descripcion">${ob.description}</p>
                        <div class="profesores">
                            ${printTeachers(ob.teachers)}
                        </div>
                        <div><i class="fas fa-plus add-teacher" aria-hidden="true"></i></div>
                        <div id="stars">
                            ${printStars(ob.stars)}
                        </div>
                        <p class="precio">${ob.price}??? <span class="u-pull-right ">${ob.priceOffer}???</span></p>
                        <input type="text" placeholder="descuento" id="descuento">
                        <a href="#" class="u-full-width button-secondary button input showTheme" data-id="${ob.id}">Ver temario</a>
                        <div class="add-theme"><i class="fas fa-plus button-add-theme" title="A??adir tema nuevo al curso" aria-hidden="true"></i></div>
                        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${ob.id}">Agregar Al Carrito</a>
                        <span class="admin-card">
                            <a href="#" class="u-full-width button-primary button input editar-curso" data-id="43">Editar Curso</a>
                            <a href="#" class="u-full-width button-primary button input eliminar-curso" data-id="43">Eliminar Curso</a>
                        </span>
                        <p class="type">${ob.category}</p>
                        <p class="dateStart"><i class="fas fa-calendar-day"> ${ob.dateStart}</i><i class="fas fa-clock"> ${ob.scheduleStart}H</i></p>
                        <p class="dateFinish"><i class="fas fa-calendar-week"> ${ob.dateFinish}</i><i class="fas fa-stopwatch"> ${ob.duration}H</i></p>
                    </div>
                </div>
            `;
        }else{*/
            coursesList.innerHTML += `
                <div class="card" data-id="${ob.id}">
                    <img src="img/${ob.img}" class="imagen-curso u-full-width">
                    <div class="info-card">
                        <h4>${ob.title}</h4>
                        <p class="descripcion">${ob.description}</p>
                        <div class="profesores">
                            ${printTeachers(ob.teachers)}
                        </div>
                        <div></div>
                        <div id="stars">
                            ${printStars(ob.stars)}
                        </div>
                        <p class="precio">${ob.price}??? <span class="u-pull-right ">${ob.priceOffer}???</span></p>
                        <input type="text" placeholder="descuento" id="descuento">
                        <a href="#" class="u-full-width button-secondary button input showTheme" data-id="${ob.id}">Ver temario</a>
                        <div class="add-theme"></div>
                        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${ob.id}">Agregar Al Carrito</a>
                        <span class="admin-card"></span>
                        <p class="type">${ob.category}</p>
                        <p class="dateStart"><i class="fas fa-calendar-day"> ${ob.dateStart}</i><i class="fas fa-clock"> ${ob.scheduleStart}H</i></p>
                        <p class="dateFinish"><i class="fas fa-calendar-week"> ${ob.dateFinish}</i><i class="fas fa-stopwatch"> ${ob.duration}H</i></p>
                    </div>
                </div>
            `;
        //}
    });
    /*if(getCookie("username")!=undefined && getUsername(getCookie("username"))){
        coursesList.innerHTML+='<i class="fas fa-plus" id="buttonAddCourse" aria-hidden="true"></i>';
    }*/
}

const loadCourses=async(type, text)=>{
    let request = await fetch(`http://localhost:8080/api/courses`);
    if(type && text){
        request = await fetch(`http://localhost:8080/api/courses/search/${type}/${text}`);
    }
    let data = await request.json();
    printCourses(data);
}

const eliminarCookie=(key)=>{
    return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loginLogout(e){
    if(e.target.id=="login"){
        containerLogin.style="display:block";
        document.body.style = "overflow:hidden";        
    }else if(e.target.id=="logout"){
        eliminarCookie("username");
        swal("Session cerrada","Has salido de la session","info");
    }
}

export const FrontOffice=async()=> {
    loadTrolley();
    await loadCourses();
    // This each 2 seconds do fetch to the courses and print
    /*setInterval(async()=>{
        await loadCourses();
    },2000);*/
    await events();
}