package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.asix.api.entity.Couxthe;
import edu.asix.api.repository.CouxthesRepository;
import edu.asix.api.service.ICouxthesService;

@Service
public class CouxthesService implements ICouxthesService {

	@Autowired
	private CouxthesRepository repoCouxthes;
	
	public List<Couxthe> buscarTodos() {
		return repoCouxthes.findAll();
	}

	public void guardar(Couxthe couxthe) {
		repoCouxthes.save(couxthe);
	}
	
	public Couxthe recuperar(int id) {
		Optional<Couxthe> optional = repoCouxthes.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int id) {
		repoCouxthes.deleteById(id);
	}
	
	public void eliminarTodos() {
		repoCouxthes.deleteAll();
	}

}
