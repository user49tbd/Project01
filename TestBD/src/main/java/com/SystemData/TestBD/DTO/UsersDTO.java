package com.SystemData.TestBD.DTO;

import java.util.List;

import com.SystemData.TestBD.Model.Posts;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class UsersDTO {
	private Long id;
	@NotBlank
	private String name;
	private String email;
	@NotBlank
	private String pass;
	private List<Posts> postL;
	
	public UsersDTO() {

	}
	
	
	public UsersDTO(Long id, @NotBlank String name, String email, @NotBlank String pass, List<Posts> postL) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.pass = pass;
		this.postL = postL;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}

	public List<Posts> getPostL() {
		return postL;
	}

	public void setPostL(List<Posts> postL) {
		this.postL = postL;
	}
	
	
}
