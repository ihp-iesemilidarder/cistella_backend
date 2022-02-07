package edu.asix.api.entity;
import java.beans.Transient;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import edu.asix.api.service.ICategoriesService;

import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name="course")
public class Course  implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cou_id")
	private int couId;
	
	@Column(name="cou_title",unique=true)
	private String couTitle;
	
	@Column(name="cou_description")
	private String couDescription;
	
    @ManyToMany
    @JoinTable(
  		  name = "couxtea", 
  		  joinColumns = @JoinColumn(name = "cxt_cou_id"), 
  		  inverseJoinColumns = @JoinColumn(name = "cxt_tea_id"))
    @Column(insertable=false,updatable=false)
    private Set<Teacher> teachers;
	
	@Column(name="cou_price")
	private double couPrice;
	
	@Column(name="cou_price_offer")
	private double couPriceOffer;
	
	@Column(name="cou_img")
	private String couImg;
	
	@Column(name="cou_date_start")
	private LocalDate couDateStart;
	
	@Column(name="cou_date_finish")
	private LocalDate couDateFinish;
	
	@Column(name="cou_schedule_start")
	private LocalTime couScheduleStart;
	
	@Column(name="cou_duration")
	private LocalTime couDuration;
	
	@Column(name="cou_stars")
	private double couStars;
	
	@Column(name="cou_cat_name")
	private String category;

	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
    		  name = "couxthe", 
    		  joinColumns = @JoinColumn(name = "cxt_cou_id"), 
    		  inverseJoinColumns = @JoinColumn(name = "cxt_the_id"))
	@Column(insertable=false,updatable=false)
    private Set<Theme> themes;

	public Set<Teacher> getTeachers() {
		return teachers;
	}

	public Set<Theme> getThemes() {
		return themes;
	}

	public int getCouId() {
		return couId;
	}

	public void setCouId(int couId) {
		this.couId = couId;
	}

	public String getCouTitle() {
		return couTitle;
	}

	public void setCouTitle(String couTitle) {
		this.couTitle = couTitle;
	}

	public String getCouDescription() {
		return couDescription;
	}

	public void setCouDescription(String couDescription) {
		this.couDescription = couDescription;
	}

	public double getCouPrice() {
		return couPrice;
	}

	public void setCouPrice(double couPrice) {
		this.couPrice = couPrice;
	}

	public double getCouPriceOffer() {
		return couPriceOffer;
	}

	public void setCouPriceOffer(double couPriceOffer) {
		this.couPriceOffer = couPriceOffer;
	}

	public String getCouImg() {
		return couImg;
	}

	public void setCouImg(String couImg) {
		this.couImg = couImg;
	}

	public LocalDate getCouDateStart() {
		return couDateStart;
	}

	public void setCouDateStart(LocalDate couDateStart) {
		this.couDateStart = couDateStart;
	}

	public LocalDate getCouDateFinish() {
		return couDateFinish;
	}

	public void setCouDateFinish(LocalDate couDateFinish) {
		this.couDateFinish = couDateFinish;
	}

	public LocalTime getCouScheduleStart() {
		return couScheduleStart;
	}

	public void setCouScheduleStart(LocalTime couScheduleStart) {
		this.couScheduleStart = couScheduleStart;
	}

	public LocalTime getCouDuration() {
		return couDuration;
	}

	public void setCouDuration(LocalTime couDuration) {
		this.couDuration = couDuration;
	}

	public double getCouStars() {
		return couStars;
	}

	public void setCouStars(double couStars) {
		this.couStars = couStars;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}	
}
