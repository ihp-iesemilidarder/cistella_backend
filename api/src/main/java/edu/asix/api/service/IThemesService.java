package edu.asix.api.service;

import java.util.List;
import java.util.Optional;

import edu.asix.api.entity.Theme;

public interface IThemesService {

	List<Theme> buscarTodos();
	Theme recuperar (int idTheme);
	void guardar(Theme theme);
	void eliminar(int idTheme);
	void eliminarTodos();
	Theme recuperarPorTitulo(String title);
}