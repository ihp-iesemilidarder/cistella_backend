package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Course;
import edu.asix.api.repository.CoursesRepository;
import edu.asix.api.service.ICoursesService;

@Service
public class CoursesService implements ICoursesService {

	@Autowired
	private CoursesRepository repoCourses;
	
	public List<Course> buscarTodos() {
		return repoCourses.findAll();
	}

	public void guardar(Course course) {
		repoCourses.save(course);
	}
	
	public Course recuperar(int idCourse) {
		Optional<Course> optional = repoCourses.findById(idCourse);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idCourse) {
		repoCourses.deleteById(idCourse);
	}

}
