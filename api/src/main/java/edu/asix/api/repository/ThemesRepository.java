package edu.asix.api.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Theme;

public interface ThemesRepository extends JpaRepository<Theme, Integer> {
	@Transactional
	@Modifying
	@Query(value="DELETE FROM theme",
			   nativeQuery=true)
	public void deleteAll();
	
	public Optional<Theme> findByTitle(String title);
}
