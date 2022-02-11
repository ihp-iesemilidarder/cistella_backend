package edu.asix.api.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Teacher;

public interface TeachersRepository extends JpaRepository<Teacher, Integer> {
	@Query(value="SELECT * FROM teacher WHERE tea_name = ?1 AND tea_surname1 = ?2 AND tea_surname2 = ?3",
		   nativeQuery=true)
	public Teacher findByNameAndSurnames(String name, String surname1, String surname2);
	
	@Transactional
	@Modifying
	@Query(value="DELETE FROM teacher",
			   nativeQuery=true)
	public void deleteAll();
}
