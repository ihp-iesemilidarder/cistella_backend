package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Teacher;
import edu.asix.api.repository.ProfilesRepository;
import edu.asix.api.repository.TeachersRepository;
import edu.asix.api.service.ITeachersService;

@Service
public class TeachersService implements ITeachersService {

	@Autowired
	private TeachersRepository repoTeachers;
	
	public List<Teacher> buscarTodos() {
		return repoTeachers.findAll();
	}

	public void guardar(Teacher teacher) {
		repoTeachers.save(teacher);
	}
	
	public Teacher recuperar(int idTeacher) {
		Optional<Teacher> optional = repoTeachers.findById(idTeacher);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idTeacher) {
		repoTeachers.deleteById(idTeacher);
	}
	
	public void eliminarTodos() {
		repoTeachers.deleteAll();
	}
	
	public Teacher buscarPorNombreApellidos(String name,String surname1,String surname2) {
		return repoTeachers.findByNameAndSurnames(name, surname1, surname2);
	}
}
