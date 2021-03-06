package edu.asix.api.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Category;
import edu.asix.api.entity.Couxthe;

public interface CouxthesRepository extends JpaRepository<Couxthe, Integer> {
	@Transactional
	@Modifying
	@Query(value="DELETE FROM couxthe",
			   nativeQuery=true)
	public void deleteAll();
}
