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

import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;
import edu.asix.api.service.IProfilesService;
import edu.asix.api.service.ITeachersService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")
public class ProfilesController {
	
	@Autowired
	private IProfilesService serviceProfiles;
	private ITeachersService serviceTeachers;
	
	@GetMapping("/profiles")
	public List<Profile> buscarTodos(){
		return serviceProfiles.buscarTodos();
	}
	
	
	@GetMapping("/profiles/{id}") 
	public Profile recuperar(@PathVariable("id") int nameProfile) {
		 Profile profile = serviceProfiles.recuperar(nameProfile);
		 return profile;
	}
	
	@PostMapping("/profiles") 
	public Profile insertar(@RequestBody Profile profile) {
		serviceProfiles.guardar(profile);
		return profile;
	}
	
	@PutMapping("/profiles")
	public Profile modificar(@RequestBody Profile profile) {
		serviceProfiles.guardar(profile);// al pasarle el id, modificará el álbum correspondiente 
		return profile;
	} 
	
	@DeleteMapping("/profiles/{id}")
	public String eliminar(@PathVariable("id") int idProfile) {
		serviceProfiles.eliminar(idProfile);
		return "Registro Eliminado";
	}
}
