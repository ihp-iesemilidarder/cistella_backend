package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Couxtea;
import edu.asix.api.repository.CouxteasRepository;
import edu.asix.api.service.ICouxteasService;

@Service
public class CouxteaService implements ICouxteasService {

	@Autowired
	private CouxteasRepository repoCouxteas;
	
	public List<Couxtea> buscarTodos() {
		return repoCouxteas.findAll();
	}

	public void guardar(Couxtea couxtea) {
		repoCouxteas.save(couxtea);
	}
	
	public Couxtea recuperar(int id) {
		Optional<Couxtea> optional = repoCouxteas.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idCourse,int idTeacher) {
		repoCouxteas.deleteByCouseAndTeacher(idCourse,idTeacher);
	}
	
	public void eliminarTodos() {
		repoCouxteas.deleteAll();
	}

}
