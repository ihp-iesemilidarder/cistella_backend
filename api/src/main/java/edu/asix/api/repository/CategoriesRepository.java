package edu.asix.api.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Category;

public interface CategoriesRepository extends JpaRepository<Category, String> {
	@Transactional
	@Modifying
	@Query(value="DELETE FROM category",
			   nativeQuery=true)
	public void deleteAll();
}
