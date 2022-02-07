package edu.asix.api.entity;
import java.util.Date;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
@Table(name="profile")
public class Profile {
	@Id
	@Column(name="pro_tea_id")
	private int id;
	
	@OneToOne
	@PrimaryKeyJoinColumn(name="pro_tea_id",referencedColumnName="tea_id")
	private Teacher teacher;
	
	@Column(name="pro_password")
	private String proPassword;
	
	@Column(name="pro_username")
	private String proUsername;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}

	public String getProPassword() {
		return proPassword;
	}

	public void setProPassword(String proPassword) {
		this.proPassword = proPassword;
	}

	public String getProUsername() {
		return proUsername;
	}

	public void setProUsername(String proUsername) {
		this.proUsername = proUsername;
	}

	@Override
	public String toString() {
		return "Profile [id=" + id + ", teacher=" + teacher + ", proPassword=" + proPassword + ", proUsername="
				+ proUsername + "]";
	}

}
