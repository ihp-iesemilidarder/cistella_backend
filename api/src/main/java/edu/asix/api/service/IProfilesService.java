package edu.asix.api.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import edu.asix.api.classes.Login;
import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;

public interface IProfilesService {

	List<Profile> buscarTodos();
	Profile recuperar (int teacher);
	void guardar(Profile profile);
	void eliminar(int teacher);
	void eliminarTodos();
	Boolean login(Login login);
}