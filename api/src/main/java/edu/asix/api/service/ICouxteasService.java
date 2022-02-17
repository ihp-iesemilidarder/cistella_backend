package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Couxtea;

public interface ICouxteasService {

	List<Couxtea> buscarTodos();
	Couxtea recuperar (int id);
	void guardar(Couxtea couxtea);
	void eliminar(int idCourse,int idTeacher);
	void eliminarTodos();
}