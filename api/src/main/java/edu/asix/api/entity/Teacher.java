package edu.asix.api.entity;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Table(name="teacher")
public class Teacher{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tea_id")
	private int teaId;
	@Column(name="tea_name")
	private String teaName;
	@Column(name="tea_surname1")
	private String teaSurname1;
	@Column(name="tea_surname2")
	private String teaSurname2;

	public int getTeaId() {
		return teaId;
	}
	public void setTeaId(int teaId) {
		this.teaId = teaId;
	}
	public String getTeaName() {
		return teaName;
	}
	public void setTeaName(String teaName) {
		this.teaName = teaName;
	}
	public String getTeaSurname1() {
		return teaSurname1;
	}
	public void setTeaSurname1(String teaSurname1) {
		this.teaSurname1 = teaSurname1;
	}
	public String getTeaSurname2() {
		return teaSurname2;
	}
	public void setTeaSurname2(String teaSurname2) {
		this.teaSurname2 = teaSurname2;
	}
	@Override
	public String toString() {
		return "Teacher [teaId=" + teaId + ", teaName=" + teaName + ", teaSurname1=" + teaSurname1 + ", teaSurname2="
				+ teaSurname2 +"]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(teaId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Teacher other = (Teacher) obj;
		return teaId == other.teaId;
	}
	
}
