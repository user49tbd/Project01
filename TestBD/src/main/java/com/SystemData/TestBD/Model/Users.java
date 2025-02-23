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
import jakarta.persistence.NamedStoredProcedureQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureParameter;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Table(name="users")
@Entity
/*
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "users.dbo.VALIDACCOUNT",
        procedureName = "dbo.VALIDACCOUNT",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "NAME", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "PASS", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.OUT, name = "RES", type = Integer.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "users.dbo.FINDUSER",
        procedureName = "dbo.FINDUSER",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "NAME", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.OUT, name = "RES", type = Integer.class)
        }
    )
})*/

public class Users {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Column(name="name",nullable=false)
	private String name;
	@Column(name="email",nullable=false)
	private String email;
	@NotBlank
	@Column(name="pass",nullable=false)
	private String pass;
	/*
	@OneToMany(mappedBy="user",cascade = CascadeType.ALL, orphanRemoval=true)
	List<Posts> listPosts;*/
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval=true)
	@JsonIgnore
	private List<Posts> listPosts = new ArrayList<>();
	
	public Users() {
		
	}
	public Users(Long id, @NotBlank String name, String email, @NotBlank String pass) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.pass = pass;
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
	public List<Posts> getListPosts() {
		return listPosts;
	}
	public void setListPosts(List<Posts> listPosts) {
		this.listPosts = listPosts;
	}
	
	
	
	
	
}
