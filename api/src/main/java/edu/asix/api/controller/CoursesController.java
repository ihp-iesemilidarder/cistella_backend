package edu.asix.api.controller;

import java.util.List;
import java.util.Optional;
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

import edu.asix.api.entity.Course;
import edu.asix.api.service.ICoursesService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")
public class CoursesController {
	
	@Autowired
	private ICoursesService serviceCourses;
	@GetMapping("/courses")
	public List<Course> buscarTodos(){
		return serviceCourses.buscarTodos();
	}
	
	@GetMapping("/courses/search/{category}/{text}")
	public List<Course> buscarPorCategoria(@PathVariable("category") String category, @PathVariable("text") String text){
		return serviceCourses.buscarPorCategoria(category,text);
	}
	
	
	@GetMapping("/courses/{id}") 
	public Course recuperar(@PathVariable("id") int idCourse) {
		 Course course = serviceCourses.recuperar(idCourse);
		 return course;
	}
	
	@PostMapping("/courses") 
	public Course insertar(@RequestBody Course course) {
		serviceCourses.guardar(course);
		return course;
	}
	
	@PutMapping("/courses")
	public Course modificar(@RequestBody Course course) {
		serviceCourses.guardar(course);// al pasarle el id, modificará el álbum correspondiente 
		return course;
	} 
	
	@DeleteMapping("/courses/{id}")
	public String eliminar(@PathVariable("id") int idCourse) {
		serviceCourses.eliminar(idCourse);
		return "Registro Eliminado";
	}
}
