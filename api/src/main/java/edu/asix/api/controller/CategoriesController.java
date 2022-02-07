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

import edu.asix.api.entity.Category;
import edu.asix.api.service.ICategoriesService;

@RestController
@RequestMapping("/api")
public class CategoriesController {
	
	@Autowired
	private ICategoriesService serviceCategories;
	
	@GetMapping("/categories")
	public List<Category> buscarTodos(){
		return serviceCategories.buscarTodos();
	}
	
	
	@GetMapping("/categories/{id}") 
	public Category recuperar(@PathVariable("id") String nameCategory) {
		 Category category = serviceCategories.recuperar(nameCategory);
		 return category;
	}
	
	@PostMapping("/categories") 
	public Category insertar(@RequestBody Category category) {
		serviceCategories.guardar(category);
		return category;
	}
	
	@PutMapping("/categories")
	public Category modificar(@RequestBody Category category) {
		serviceCategories.guardar(category);// al pasarle el id, modificará el álbum correspondiente 
		return category;
	} 
	
	@DeleteMapping("/categories/{id}")
	public String eliminar(@PathVariable("id") String idCategory) {
		serviceCategories.eliminar(idCategory);
		return "Registro Eliminado";
	}
}
