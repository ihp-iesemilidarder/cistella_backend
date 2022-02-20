import { fetchApi } from "../Utils.js";

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

export const eventsThemesCourse=(e)=>{
    let dom = e.target;
    if(dom.classList.contains("delete-theme")){
        deleteTheme(dom,dom.dataset.id,dom.dataset.idtheme);
    }
}