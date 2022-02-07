package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Category;
import edu.asix.api.repository.CategoriesRepository;
import edu.asix.api.service.ICategoriesService;

@Service
public class CategoriesService implements ICategoriesService {

	@Autowired
	private CategoriesRepository repoCategories;
	
	public List<Category> buscarTodos() {
		return repoCategories.findAll();
	}

	public void guardar(Category category) {
		repoCategories.save(category);
	}
	
	public Category recuperar(String nameCategory) {
		Optional<Category> optional = repoCategories.findById(nameCategory);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(String nameCategory) {
		repoCategories.deleteById(nameCategory);
	}

}
