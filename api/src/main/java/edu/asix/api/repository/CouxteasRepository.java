package edu.asix.api.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import edu.asix.api.entity.Category;
import edu.asix.api.entity.Couxtea;

public interface CouxteasRepository extends JpaRepository<Couxtea, Integer> {
	@Transactional
	@Modifying
	@Query(value="DELETE FROM couxtea",
			   nativeQuery=true)
	public void deleteAll();
	
	@Transactional
	@Modifying
	@Query(value="DELETE FROM couxtea WHERE cxt_cou_id=?1 AND cxt_tea_id=?2",
			   nativeQuery=true)
	public void deleteByCouseAndTeacher(int idCourse,int idTeacher);
}
