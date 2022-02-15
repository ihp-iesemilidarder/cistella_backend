package edu.asix.api.controller;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.asix.api.entity.Teacher;
import edu.asix.api.service.IProfilesService;
import edu.asix.api.service.ITeachersService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")
public class TeachersController {
	
	@Autowired
	private ITeachersService serviceTeachers;
	
	@GetMapping("/teachers")
	public List<Teacher> buscarTodos(){
		return serviceTeachers.buscarTodos();
	}
	
	@GetMapping("/teachers/search/{name}/{surname1}/{surname2}") 
	public Object buscarPorNombreApellidos(@PathVariable("name") String name,@PathVariable("surname1") String surname1,@PathVariable("surname2") String surname2) {
			HashMap<String,String> result = new HashMap<String,String>();
			try {
				result.put("title", "Ups...");
				result.put("type", "warning");
				if(name.length()==0) {
					result.put("text", "Falta rellenar el nombre");
					return result;
				}else if(surname1.length()==0) {
					result.put("text", "Falta rellenar el primer apellido");
					return result;
				}else if(surname2.length()==0) {
					result.put("text", "Falta rellenar el segundo apellido");
					return result;
				}
				 Teacher teacher = serviceTeachers.buscarPorNombreApellidos(name,surname1,surname2);
				 return teacher;
			}catch(Exception e){
				result.put("type", "error");
				result.put("title", "Error inesperado");
				result.put("text", "Vaya!! No te has podido registrar, intentalo otra vez");
				return result;
			}
	}
	
	@GetMapping("/teachers/{id}") 
	public Teacher recuperar(@PathVariable("id") int idTeacher) {
		 Teacher teacher = serviceTeachers.recuperar(idTeacher);
		 return teacher;
	}
	
	@PostMapping("/teachers") 
	public Object insertar(@RequestBody Teacher teacher) {
		HashMap<String,String> result = new HashMap<String,String>();
		try {
			result.put("title", "Ups...");
			result.put("type", "warning");
			if(teacher.getName().length()==0) {
				result.put("text", "Falta rellenar el nombre");
				return result;
			}else if(teacher.getFirstSurname().length()==0) {
				result.put("text", "Falta rellenar el primer apellido");
				return result;
			}else if(teacher.getSecondSurname().length()==0) {
				result.put("text", "Falta rellenar el segundo apellido");
				return result;
			}
			serviceTeachers.guardar(teacher);
			return true;
		}catch(Exception e){
			result.put("type", "error");
			result.put("title", "Error inesperado");
			result.put("text", "Vaya!! No te has podido registrar, intentalo otra vez");
			return result;
		}
	}
	
	@PutMapping("/teachers")
	public Teacher modificar(@RequestBody Teacher teacher) {
		serviceTeachers.guardar(teacher);// al pasarle el id, modificará el álbum correspondiente 
		return teacher;
	}
	
	@DeleteMapping("/teachers/{id}")
	public String eliminar(@PathVariable("id") int idTeacher) {
		serviceTeachers.eliminar(idTeacher);
		return "Registro Eliminado";
	}
	
	@DeleteMapping("/teachers/all")
	public String eliminarTodos() {
		serviceTeachers.eliminarTodos();
		return "Registros Eliminados";
	}
}
