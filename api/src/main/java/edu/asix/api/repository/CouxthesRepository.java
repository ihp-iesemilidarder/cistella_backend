package edu.asix.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Category;
import edu.asix.api.entity.Couxthe;

public interface CouxthesRepository extends JpaRepository<Couxthe, Integer> {
	public List<Couxthe> findByCourseOrderByOrderAsc(int course);
}
