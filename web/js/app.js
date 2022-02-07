const coursesList = document.querySelector("#list-content");
const search = document.querySelector("#buscador");
let coursesTrolley = JSON.parse(localStorage.getItem("coursesTrolley")) || [];
const Trolley = document.querySelector("#lista-carrito > tbody");
const numTrolley = document.querySelector("#num-cursos");
const buttonEmptyTrolley = document.querySelector("#vaciar-carrito");

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
        priceTotalTolley += (parseInt(course.price)*course.count);
        let clase =(course.offert[1] == 0)?'style="display:none;"':"";
        Trolley.innerHTML += `
        <tr>
            <td><img src="${course.img}"></td>
            <td>${course.title}</td>
            <td>${course.teacher}</td>
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
        price: parseInt(courseElement.querySelector(".precio > span").textContent.replace("€","")),
        teacher: courseElement.querySelector(".profesor").textContent,
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

function events(){
    search.addEventListener("keyup",filterCourse);
    coursesList.addEventListener("click",addCourse);
    Trolley.addEventListener("click",deleteCourse);
    buttonEmptyTrolley.addEventListener("click",emptyTrolley)
}

function filterCourse(e){
    e.preventDefault();
    loadCourses((search.value != "")?search.value:null);
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

function printCourses(data, type) {
    coursesList.innerHTML = "";
    data.forEach(ob => {
        let category = document.querySelector("select option:checked").value;
        // I convert the values to upper case always for compare
        if(!type || String(ob[category]).toUpperCase().includes(type.toUpperCase())){
            coursesList.innerHTML += `
            <div class="card">
                <img src="img/${ob.img}" class="imagen-curso u-full-width">
                <div class="info-card">
                    <h4>${ob.title}</h4>
                    <p class="descripcion">${ob.description}</p>
                    <p class="profesor"><i class="fas fa-user"></i> ${ob.teacher}</p>
                    <div id="stars">
                        ${printStars(ob.stars)}
                    </div>
                    <p class="precio">${ob.price}€ <span class="u-pull-right ">${ob.priceOffer}€</span></p>
                    <input type="text" placeholder="descuento" id="descuento">
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${ob.id}">Agregar Al Carrito</a>
                    <p class="type">${ob.type}</p>
                    <p class="date">${ob.StartDate} <---> ${ob.EndDate}</p>
                </div>
            </div>
            `;
        }
    });
}

function loadCourses(type) {
    fetch("data/cursos.json")
        .then(r => r.json()) 
        .then(data => printCourses(data, type))
}

const init=()=> {
    loadTrolley();
    loadCourses();
    events();
}

init();