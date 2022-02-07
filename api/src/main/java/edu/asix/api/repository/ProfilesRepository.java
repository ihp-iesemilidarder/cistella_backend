package edu.asix.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Profile;
import edu.asix.api.entity.Teacher;

public interface ProfilesRepository extends JpaRepository<Profile, Integer> {
}
