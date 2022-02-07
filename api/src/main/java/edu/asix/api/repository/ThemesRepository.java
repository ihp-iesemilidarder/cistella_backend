package edu.asix.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Theme;

public interface ThemesRepository extends JpaRepository<Theme, Integer> {
	
}
