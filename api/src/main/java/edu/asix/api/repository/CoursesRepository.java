package edu.asix.api.repository;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Course;

public interface CoursesRepository extends JpaRepository<Course, Integer> {
	public List<Course> findByCouTitleContaining(String text);
	public List<Course> findByCouPrice(double text);
	public List<Course> findByCouDateStart(LocalDate text);
	public List<Course> findByCategoryContaining(String text);
	@Transactional
	@Modifying
	@Query(value="DELETE FROM course",
			   nativeQuery=true)
	public void deleteAll();
}
