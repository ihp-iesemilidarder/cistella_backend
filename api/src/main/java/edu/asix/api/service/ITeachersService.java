package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Teacher;

public interface ITeachersService {

	List<Teacher> buscarTodos();
	Teacher recuperar (int idTeacher);
	void guardar(Teacher teacher);
	void eliminar(int idTeacher);
}