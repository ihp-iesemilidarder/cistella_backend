const coursesList = document.querySelector("#list-content");
const search = document.querySelector("#buscador");
let coursesTrolley = JSON.parse(localStorage.getItem("coursesTrolley")) || [];
const Trolley = document.querySelector("#lista-carrito > tbody");
const numTrolley = document.querySelector("#num-cursos");
const buttonEmptyTrolley = document.querySelector("#vaciar-carrito");
const buttonLogin = document.querySelector("i.fa-sign-in-alt");
const containerForm = document.querySelector("form#loginForm");
const containerTheme = document.querySelector("div#themeCourse");
const closeTheme = containerTheme.querySelector("i.fa-times");
const closeForm = containerForm.querySelector("i.fa-times");

const emptyTrolley=(e) => {
    e.preventDefault();
    localStorage.removeItem("coursesTrolley");
    coursesTrolley = [];
    loadTrolley();
}

function deleteCourse(e){
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
            <td>${course.price}€</td>
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
        <td>${priceTotalTolley}€</td>
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
        price: parseFloat(courseElement.querySelector(".precio > span").textContent.replace("€","")),
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

const jsonTheme=async(id)=>{
    let request = await fetch(`http://localhost:8080/api/themes/${id}`);
    let data = await request.json();
    return data;
}

const showListThemes=async(id)=>{
    let request = await fetch(`http://localhost:8080/api/couxthes/c.${id}`);
    let data = await request.json();
    return data;
}

const printSheet=async(id)=>{
    let themes = await showListThemes(id);
    console.log(themes);
    containerTheme.querySelector("div").innerHTML="";
    themes.forEach(async theme=>{
        console.log(theme.order);
        let themeJSON = await jsonTheme(theme.theme);
        console.log(themeJSON);
        containerTheme.querySelector("div").innerHTML+=`
            <div>
                <h5><font color="red">${theme.order}.</font> ${themeJSON.theTitle}</h5>
                <p>${themeJSON.theDescription}</p>                
            </div>
        `;
    });
}

const showTheme=async(e)=>{
    let node = e.target;
    if(node.classList.contains("showTheme")){
        await printSheet(node.dataset.id);
    }
    containerTheme.style="display:block";
}

const events=async()=>{
    search.addEventListener("keyup",filterCourse);
    coursesList.addEventListener("click",addCourse);
    Trolley.addEventListener("click",deleteCourse);
    buttonEmptyTrolley.addEventListener("click",emptyTrolley);
    buttonLogin.addEventListener("click",login);
    
    closeForm.addEventListener("click",(e)=>{
        e.target.parentNode.parentNode.removeAttribute("style");
        document.body.removeAttribute("style");
    });
    closeTheme.addEventListener("click",(e)=>{
        e.target.parentNode.removeAttribute("style");
        document.body.removeAttribute("style");
    });
    coursesList.addEventListener("click",await showTheme);
}

function filterCourse(e){
    e.preventDefault();
    let category = document.querySelector("select option:checked").value;
    loadCourses(category,(search.value != "")?search.value:null);
}

const printStars = (count)=>{
    let stars='';
    let dec = (count % 1 == 0)?false:true; // is decimal the number?
    for(x = 1; x <= 5; x++){
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
    result = "";
    teachers.forEach(teacher=>{
        result+=`
            <p class="profesor"><i class="fas fa-user"></i><span>${teacher.teaName} ${teacher.teaSurname1} ${teacher.teaSurname2}</span></p>
        `;         
    });
    return result;
}

function printCourses(data) {
    coursesList.innerHTML = "";
    data.forEach(ob => {
        // I convert the values to upper case always for compare
        coursesList.innerHTML += `
            <div class="card">
                <img src="img/${ob.couImg}" class="imagen-curso u-full-width">
                <div class="info-card">
                    <h4>${ob.couTitle}</h4>
                    <p class="descripcion">${ob.couDescription}</p>
                    ${printTeachers(ob.teachers)}
                    <div id="stars">
                        ${printStars(ob.couStars)}
                    </div>
                    <p class="precio">${ob.couPrice}€ <span class="u-pull-right ">${ob.couPriceOffer}€</span></p>
                    <input type="text" placeholder="descuento" id="descuento">
                    <a href="#" class="u-full-width button-secondary button input showTheme" data-id="${ob.couId}">Ver temario</a>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${ob.couId}">Agregar Al Carrito</a>
                    <p class="type">${ob.category}</p>
                    <p class="dateStart"><i class="fas fa-calendar-day"> ${ob.couDateStart}</i><i class="fas fa-clock"> ${ob.couScheduleStart}H</i></p>
                    <p class="dateFinish"><i class="fas fa-calendar-week"> ${ob.couDateFinish}</i><i class="fas fa-stopwatch"> ${ob.couDuration}H</i></p>
                </div>
            </div>
        `;
    });
}

const loadCourses=async(type, text)=>{
    let request = await fetch(`http://localhost:8080/api/courses`);
    if(type && text){
        request = await fetch(`http://localhost:8080/api/courses/search/${type}/${text}`);
    }
    let data = await request.json();
    printCourses(data);
}

function login(){
    containerForm.style="display:block";
    document.body.style = "overflow:hidden";
}

const init=async()=> {
    loadTrolley();
    await loadCourses();
    await events();
}

init();