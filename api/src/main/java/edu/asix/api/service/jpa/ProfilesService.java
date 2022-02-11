package edu.asix.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;
import edu.asix.api.repository.ProfilesRepository;
import edu.asix.api.service.IProfilesService;

@Service
public class ProfilesService implements IProfilesService {

	@Autowired
	private ProfilesRepository repoProfiles;
	
	public List<Profile> buscarTodos() {
		return repoProfiles.findAll();
	}

	public void guardar(Profile profile) {
		repoProfiles.save(profile);
	}
	
	public Profile recuperar(int teacher) {
		Optional<Profile> optional = repoProfiles.findById(teacher);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int teacher) {
		repoProfiles.deleteById(teacher);
	}

	public void eliminarTodos() {
		repoProfiles.deleteAll();
	}

}
