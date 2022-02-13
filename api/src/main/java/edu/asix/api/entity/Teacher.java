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
	private int id;
	@Column(name="tea_name")
	private String name;
	@Column(name="tea_surname1")
	private String firstSurname;
	@Column(name="tea_surname2")
	private String secondSurname;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFirstSurname() {
		return firstSurname;
	}
	public void setFirstSurname(String firstSurname) {
		this.firstSurname = firstSurname;
	}
	public String getSecondSurname() {
		return secondSurname;
	}
	public void setSecondSurname(String secondSurname) {
		this.secondSurname = secondSurname;
	}
	@Override
	public int hashCode() {
		return Objects.hash(firstSurname, id, name, secondSurname);
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
		return Objects.equals(firstSurname, other.firstSurname) && id == other.id && Objects.equals(name, other.name)
				&& Objects.equals(secondSurname, other.secondSurname);
	}
	@Override
	public String toString() {
		return "Teacher [id=" + id + ", name=" + name + ", firstSurname=" + firstSurname + ", secondSurname="
				+ secondSurname + "]";
	}
}
