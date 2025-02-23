package com.SystemData.TestBD.DTO;

import java.util.ArrayList;
import java.util.List;

import com.SystemData.TestBD.Model.ImgLst;
import com.SystemData.TestBD.Model.Users;

public class PostsDTO {
	private long id;
	private String title;
	private String desc;
	private Users user;
	private List<ImgLst> img;
	
	public PostsDTO() {
		
	}
	
	public PostsDTO(long id, String title, String desc, Users user, List<ImgLst> img) {
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

	public long getId() {
		return id;
	}
	public void setId(long id) {
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
