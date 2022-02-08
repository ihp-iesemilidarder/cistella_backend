package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Course;

public interface ICoursesService {

	List<Course> buscarTodos();
	Course recuperar (int idCourse);
	void guardar(Course course);
	void eliminar(int idCourse);
	List<Course> buscarPorCategoria(String category, String text);
}