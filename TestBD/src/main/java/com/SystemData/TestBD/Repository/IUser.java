package com.SystemData.TestBD.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import com.SystemData.TestBD.Model.Users;

public interface IUser extends JpaRepository<Users,Long>{
	/*
	@Procedure(name = "VALIDACCOUNT", procedureName = "dbo.VALIDACCOUNT")
	Integer checkUser(String name, String pass);
	
	@Procedure(name = "FINDUSER", procedureName = "dbo.FINDUSER")
	Integer findUser(String name);*/
	
	Users findByName(String name);
	
}
