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
	private int theId;

	@Column(name="the_title")
	private String theTitle;
	
	@Column(name="the_description")
	private String theDescription;
	
	public int getTheId() {
		return theId;
	}
	public void setTheId(int theId) {
		this.theId = theId;
	}
	public String getTheTitle() {
		return theTitle;
	}
	public void setTheTitle(String theTitle) {
		this.theTitle = theTitle;
	}
	public String getTheDescription() {
		return theDescription;
	}
	public void setTheDescription(String theDescription) {
		this.theDescription = theDescription;
	}
	@Override
	public String toString() {
		return "Theme [theId=" + theId + ", theTitle=" + theTitle + ", theDescription=" + theDescription + "]";
	}
}