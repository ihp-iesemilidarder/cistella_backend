package edu.asix.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Category;

public interface CategoriesRepository extends JpaRepository<Category, String> {
}
