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

@Entity
@Table(name="theme")
public class Theme {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="the_id")
	private int id;

	@Column(name="the_title")
	private String title;
	
	@Column(name="the_description")
	private String description;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Theme [id=" + id + ", title=" + title + ", description=" + description + "]";
	}
	
	
}