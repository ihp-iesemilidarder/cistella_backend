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

import com.lambdaworks.crypto.SCryptUtil;

import edu.asix.api.classes.Login;
import edu.asix.api.entity.Category;
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
	
	@PostMapping("/profiles/register") 
	public Object insertarRegistro(@RequestBody Profile profile) {
		HashMap<String,String> result = new HashMap<String,String>();
		try {
			result.put("title", "Ups...");
			result.put("type", "warning");
			if(profile.getUsername().length()==0) {
				result.put("text", "Falta rellenar el nick");
				return result;
			}else if(profile.getPassword().length()==0) {
				result.put("text", "Falta rellenar la contraseña");
				return result;
			}
			String  originalPassword = profile.getPassword().toString();
			String generatedSecuredPasswordHash = SCryptUtil.scrypt(originalPassword, 16, 16, 16);
			profile.setPassword(generatedSecuredPasswordHash);
			serviceProfiles.guardar(profile);
			result.put("type", "success");
			result.put("title", "Registrado correctamente");
			result.put("text", "Bien!!! Te has registrado!!");
			return result;
		}catch(Exception e){
			result.put("type", "error");
			result.put("title", "Error inesperado");
			result.put("text", "Vaya!! No te has podido registrar, intentalo otra vez");
			return result;
		}
	}
	
	@PutMapping("/profiles")
	public Profile modificar(@RequestBody Profile profile) {
		String  originalPassword = profile.getPassword().toString();
		String generatedSecuredPasswordHash = SCryptUtil.scrypt(originalPassword, 16, 16, 16);
		profile.setPassword(generatedSecuredPasswordHash);
		serviceProfiles.guardar(profile);// al pasarle el id, modificará el álbum correspondiente 
		return profile;
	} 
	
	@DeleteMapping("/profiles/{id}")
	public String eliminar(@PathVariable("id") int idProfile) {
		serviceProfiles.eliminar(idProfile);
		return "Registro Eliminado";
	}
	@DeleteMapping("/profiles/all")
	public String eliminarTodos() {
		serviceProfiles.eliminarTodos();
		return "Registros Eliminados";
	}
	
	@PostMapping("/profiles/login") 
	public Boolean login(@RequestBody Login login) {
		return serviceProfiles.login(login);
	}
}
