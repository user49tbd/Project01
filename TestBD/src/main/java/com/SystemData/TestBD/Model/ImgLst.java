package com.SystemData.TestBD.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name="imgLst")
@Entity
public class ImgLst {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Lob
    @Column(columnDefinition = "VARBINARY(MAX)")
	private byte[] img;
	
	@ManyToOne
	@JoinColumn(name= "post_id",nullable=false)
	private Posts post;
	
	

	public ImgLst(Long id, byte[] img, Posts post) {
		super();
		this.id = id;
		this.img = img;
		this.post = post;
	}

	public ImgLst() {
		
	}
	
	public Posts getPost() {
		return post;
	}

	public void setPost(Posts post) {
		this.post = post;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getImg() {
		return img;
	}

	public void setImg(byte[] img) {
		this.img = img;
	}
	

	
	
}
