package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Category;

public interface ICategoriesService {

	List<Category> buscarTodos();
	Category recuperar (String idCategory);
	void guardar(Category category);
	void eliminar(String idCategory);
	void eliminarTodos();
}