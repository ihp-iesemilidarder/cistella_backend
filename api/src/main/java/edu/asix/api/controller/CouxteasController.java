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

import edu.asix.api.entity.Couxtea;
import edu.asix.api.service.ICouxteasService;

@RestController
@RequestMapping("/api")
public class CouxteasController {
	
	@Autowired
	private ICouxteasService serviceCouxteas;
	@GetMapping("/couxteas")
	public List<Couxtea> buscarTodos(){
		return serviceCouxteas.buscarTodos();
	}
	
	
	@GetMapping("/couxteas/{id}") 
	public Couxtea recuperar(@PathVariable("id") int id) {
		 Couxtea couxtea = serviceCouxteas.recuperar(id);
		 return couxtea;
	}
	
	@PostMapping("/couxteas") 
	public Couxtea insertar(@RequestBody Couxtea couxtea) {
		serviceCouxteas.guardar(couxtea);
		return couxtea;
	}
	
	@PutMapping("/couxteas")
	public Couxtea modificar(@RequestBody Couxtea couxtea) {
		serviceCouxteas.guardar(couxtea);// al pasarle el id, modificará el álbum correspondiente 
		return couxtea;
	} 
	
	@DeleteMapping("/couxteas/{id}")
	public String eliminar(@PathVariable("id") int id) {
		serviceCouxteas.eliminar(id);
		return "Registro Eliminado";
	}
}
