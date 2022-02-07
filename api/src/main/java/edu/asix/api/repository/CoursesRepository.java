package edu.asix.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Course;

public interface CoursesRepository extends JpaRepository<Course, Integer> {

}
