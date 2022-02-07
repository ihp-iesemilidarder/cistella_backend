package edu.asix.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Teacher;

public interface TeachersRepository extends JpaRepository<Teacher, Integer> {

}
