package edu.asix.api.service;

import java.util.List;

import edu.asix.api.entity.Couxthe;

public interface ICouxthesService {

	List<Couxthe> buscarTodos();
	Couxthe recuperar (int id);
	void guardar(Couxthe couxthe);
	void eliminar(int id);
	void eliminarTodos();
}