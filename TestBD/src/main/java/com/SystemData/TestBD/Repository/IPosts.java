package com.SystemData.TestBD.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SystemData.TestBD.Model.Posts;

public interface IPosts extends JpaRepository<Posts,Long>{

}
