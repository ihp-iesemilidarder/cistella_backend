package edu.asix.api.controller;

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

import edu.asix.api.entity.Theme;
import edu.asix.api.service.IThemesService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")
public class ThemesController {
	
	@Autowired
	private IThemesService serviceThemes;
	
	@GetMapping("/themes")
	public List<Theme> buscarTodos(){
		return serviceThemes.buscarTodos();
	}
	
	
	@GetMapping("/themes/{id}") 
	public Theme recuperar(@PathVariable("id") int idTheme) {
		 Theme teacher = serviceThemes.recuperar(idTheme);
		 return teacher;
	}
	
	@PostMapping("/themes") 
	public Theme insertar(@RequestBody Theme teacher) {
		serviceThemes.guardar(teacher);
		return teacher;
	}
	
	@PutMapping("/themes")
	public Theme modificar(@RequestBody Theme teacher) {
		serviceThemes.guardar(teacher);// al pasarle el id, modificará el álbum correspondiente 
		return teacher;
	} 
	
	@DeleteMapping("/themes/{id}")
	public String eliminar(@PathVariable("id") int idTheme) {
		serviceThemes.eliminar(idTheme);
		return "Registro Eliminado";
	}
}
