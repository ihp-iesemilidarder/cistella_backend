package edu.asix.api.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.asix.api.entity.Couxthe;
import edu.asix.api.service.ICouxthesService;

@RestController
@RequestMapping("/api")
public class CouxthesController {
	
	@Autowired
	private ICouxthesService serviceCouxthes;
	@GetMapping("/couxthes")
	public List<Couxthe> buscarTodos(){
		return serviceCouxthes.buscarTodos();
	}
	
	
	@GetMapping("/couxthes/{id}") 
	public Couxthe recuperar(@PathVariable("id") int id) {
		 Couxthe couxthe = serviceCouxthes.recuperar(id);
		 return couxthe;
	}
	
	@PostMapping("/couxthes") 
	public Couxthe insertar(@RequestBody Couxthe couxthe) {
		serviceCouxthes.guardar(couxthe);
		return couxthe;
	}
	
	@PutMapping("/couxthes")
	public Couxthe modificar(@RequestBody Couxthe couxthe) {
		serviceCouxthes.guardar(couxthe);// al pasarle el id, modificará el álbum correspondiente 
		return couxthe;
	} 
	
	@DeleteMapping("/couxthes/{id}")
	public String eliminar(@PathVariable("id") int id) {
		serviceCouxthes.eliminar(id);
		return "Registro Eliminado";
	}
}
