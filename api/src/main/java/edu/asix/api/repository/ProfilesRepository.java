package edu.asix.api.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;

public interface ProfilesRepository extends JpaRepository<Profile, Integer> {
	@Transactional
	@Modifying
	@Query(value="DELETE FROM profile",
			   nativeQuery=true)
	public void deleteAll();
}
