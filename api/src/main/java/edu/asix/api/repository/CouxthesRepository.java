package edu.asix.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Category;
import edu.asix.api.entity.Couxthe;

public interface CouxthesRepository extends JpaRepository<Couxthe, Integer> {
}
