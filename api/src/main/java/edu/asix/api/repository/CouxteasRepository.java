package edu.asix.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.asix.api.entity.Category;
import edu.asix.api.entity.Couxtea;

public interface CouxteasRepository extends JpaRepository<Couxtea, Integer> {
}
