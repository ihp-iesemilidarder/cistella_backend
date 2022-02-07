package edu.asix.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.asix.api.entity.Teacher;
import edu.asix.api.service.ITeachersService;

@RestController
@RequestMapping("/api")
public class TeachersController {
	
	@Autowired
	private ITeachersService serviceTeachers;
	
	@GetMapping("/teachers")
	public List<Teacher> buscarTodos(){
		return serviceTeachers.buscarTodos();
	}
	
	
	@GetMapping("/teachers/{id}") 
	public Teacher recuperar(@PathVariable("id") int idTeacher) {
		 Teacher teacher = serviceTeachers.recuperar(idTeacher);
		 return teacher;
	}
	
	@PostMapping("/teachers") 
	public Teacher insertar(@RequestBody Teacher teacher) {
		serviceTeachers.guardar(teacher);
		return teacher;
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
}
