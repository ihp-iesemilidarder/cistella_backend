package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Theme;
import edu.asix.api.repository.ThemesRepository;
import edu.asix.api.service.IThemesService;

@Service
public class ThemesService implements IThemesService {

	@Autowired
	private ThemesRepository repoThemes;
	
	public List<Theme> buscarTodos() {
		return repoThemes.findAll();
	}

	public void guardar(Theme theme) {
		repoThemes.save(theme);
	}
	
	public Theme recuperar(int idTheme) {
		Optional<Theme> optional = repoThemes.findById(idTheme);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idTheme) {
		repoThemes.deleteById(idTheme);
	}
	
	public void eliminarTodos() {
		repoThemes.deleteAll();
	}
	
	public Theme recuperarPorTitulo(String title) {
		Optional<Theme> optional = repoThemes.findByTitle(title);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

}
