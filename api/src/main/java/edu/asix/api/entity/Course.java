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
	private int id;
	
	@Column(name="cou_title",unique=true)
	private String title;
	
	@Column(name="cou_description")
	private String description;
	
    @ManyToMany
    @JoinTable(
  		  name = "couxtea", 
  		  joinColumns = @JoinColumn(name = "cxt_cou_id"), 
  		  inverseJoinColumns = @JoinColumn(name = "cxt_tea_id"))
    @Column(insertable=false,updatable=false)
    private Set<Teacher> teachers;
	
	@Column(name="cou_price")
	private double price;
	
	@Column(name="cou_price_offer")
	private double priceOffer;
	
	@Column(name="cou_img")
	private String img;
	
	@Column(name="cou_date_start")
	private LocalDate dateStart;
	
	@Column(name="cou_date_finish")
	private LocalDate dateFinish;
	
	@Column(name="cou_schedule_start")
	private LocalTime scheduleStart;
	
	@Column(name="cou_duration")
	private LocalTime duration;
	
	@Column(name="cou_stars")
	private double stars;
	
	@Column(name="cou_cat_name")
	private String category;

	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
    		  name = "couxthe", 
    		  joinColumns = @JoinColumn(name = "cxt_cou_id"), 
    		  inverseJoinColumns = @JoinColumn(name = "cxt_the_id"))
	@Column(insertable=false,updatable=false)
    private Set<Theme> themes;

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

	public Set<Teacher> getTeachers() {
		return teachers;
	}

	public void setTeachers(Set<Teacher> teachers) {
		this.teachers = teachers;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getPriceOffer() {
		return priceOffer;
	}

	public void setPriceOffer(double priceOffer) {
		this.priceOffer = priceOffer;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public LocalDate getDateStart() {
		return dateStart;
	}

	public void setDateStart(LocalDate dateStart) {
		this.dateStart = dateStart;
	}

	public LocalDate getDateFinish() {
		return dateFinish;
	}

	public void setDateFinish(LocalDate dateFinish) {
		this.dateFinish = dateFinish;
	}

	public LocalTime getScheduleStart() {
		return scheduleStart;
	}

	public void setScheduleStart(LocalTime scheduleStart) {
		this.scheduleStart = scheduleStart;
	}

	public LocalTime getDuration() {
		return duration;
	}

	public void setDuration(LocalTime duration) {
		this.duration = duration;
	}

	public double getStars() {
		return stars;
	}

	public void setStars(double stars) {
		this.stars = stars;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Set<Theme> getThemes() {
		return themes;
	}

	public void setThemes(Set<Theme> themes) {
		this.themes = themes;
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", title=" + title + ", description=" + description + ", teachers=" + teachers
				+ ", price=" + price + ", priceOffer=" + priceOffer + ", img=" + img + ", dateStart=" + dateStart
				+ ", dateFinish=" + dateFinish + ", scheduleStart=" + scheduleStart + ", duration=" + duration
				+ ", stars=" + stars + ", category=" + category + ", themes=" + themes + "]";
	}
}
