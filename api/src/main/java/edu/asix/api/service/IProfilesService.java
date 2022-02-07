package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;

public interface IProfilesService {

	List<Profile> buscarTodos();
	Profile recuperar (int teacher);
	void guardar(Profile profile);
	void eliminar(int teacher);
}