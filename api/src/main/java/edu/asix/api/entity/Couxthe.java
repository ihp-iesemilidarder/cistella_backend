package edu.asix.api.entity;
import java.util.Date;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="couxthe")
public class Couxthe {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cxt_id")
	private int id;
	
	@OneToOne
    @JoinColumn(name = "cxt_cou_id", referencedColumnName = "cou_id")
	private Course course;
	
	@OneToOne
    @JoinColumn(name = "cxt_the_id", referencedColumnName = "the_id")
	private Theme theme;
	
	@Column(name="cxt_order")
	private int order;

	
	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Theme getTheme() {
		return theme;
	}

	public void setTheme(Theme theme) {
		this.theme = theme;
	}

	
}
