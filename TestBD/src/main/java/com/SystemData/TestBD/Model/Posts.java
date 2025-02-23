package com.SystemData.TestBD.Model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Table(name="posts")
@Entity
public class Posts {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(name="title")
	private String title;
	@Column(name="description", length=50)
	private String desc;
	
	@ManyToOne
	@JoinColumn(nullable=false,name="user_id")
	private Users user;
	
	@OneToMany(mappedBy="post",cascade=CascadeType.ALL,orphanRemoval=true)
	@JsonIgnore
	private List<ImgLst> img = new ArrayList<>();
	
	public Posts() {
		
	}
	
	public Posts(Long id, String title, String desc, Users user, List<ImgLst> img) {
		super();
		this.id = id;
		this.title = title;
		this.desc = desc;
		this.user = user;
		this.img = img;
	}

	public List<ImgLst> getImg() {
		return img;
	}

	public void setImg(List<ImgLst> img) {
		this.img = img;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	
	

}
