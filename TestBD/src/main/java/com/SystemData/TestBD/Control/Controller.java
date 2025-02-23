package com.SystemData.TestBD.Control;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SystemData.TestBD.DTO.ImgLstDTO;
import com.SystemData.TestBD.DTO.PostsDTO;
import com.SystemData.TestBD.DTO.UsersDTO;
import com.SystemData.TestBD.Exception.invalidUser;
import com.SystemData.TestBD.Model.ImgLst;
import com.SystemData.TestBD.Model.Posts;
import com.SystemData.TestBD.Model.Users;
import com.SystemData.TestBD.Repository.IImgLst;
import com.SystemData.TestBD.Repository.IPosts;
import com.SystemData.TestBD.Repository.IUser;
import jakarta.persistence.NamedStoredProcedureQuery;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureParameter;
import jakarta.transaction.Transactional;
@RestController
@RequestMapping("/api")
public class Controller {
	
	@Autowired
	IUser Usersrep;
	@Autowired
	IPosts Postsrep;
	@Autowired
	IImgLst imgrep;
	@Autowired
	JdbcTemplate jdbc;
	
	@PostMapping("/insrtUser")
	public ResponseEntity<?> insertUser(@RequestBody UsersDTO dto) {
	    Users u = this.toUsers(dto, "c");
	    Users u2 = new Users();
	    u2 = this.Usersrep.findByName(u.getName());
	    if(u2 != null) {
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(new invalidUser("usuário já cadastrado"));
	    }else {
	    	 return ResponseEntity.ok(this.Usersrep.save(u));
	    }
	}
	@GetMapping("/f/{user}")
	public ResponseEntity<Boolean> findUser(@PathVariable String user){
		Users u = this.Usersrep.findByName(user);
		if(u != null) {
			return ResponseEntity.ok().body(true);
		}
		return ResponseEntity.ok().body(false);
	}
	@PostMapping("/checkUsr")
	public ResponseEntity<?> chackDataUser(@RequestBody UsersDTO dto) {
	    Users u = this.toUsers(dto, "c");
	    Users u3 = new Users();
	    u3 = this.Usersrep.findByName(u.getName());
	    if(u3 != null) {
	    	UsersDTO u2 = this.ToUsersDTO(u3);
	    	System.out.println(u2.getName()+" - "+u.getName());
	    	System.out.println(u2.getPass()+" - "+u.getPass());
	    	if((u2.getName().equals(u.getName())) && (u2.getPass().equals(u.getPass()))) {
	    		return ResponseEntity.ok().body(u2);
	    	}else {
	    		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
		                .body("dados invalidos");
	    	}
	    }else {
	    	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("usuário inexistente ");
	    }
	}
	@DeleteMapping("/delPost/{id}")
	@Transactional
	public ResponseEntity<String> delPosts(@PathVariable Long id) {
	    Optional<Posts> optionalPost = this.Postsrep.findById(id);

	    if (optionalPost.isPresent()) {
	        Posts p = optionalPost.get();
	        List<ImgLst> arr = returnimgs(p.getId());
	        //p.setImg(returnimgs(p.getId()));
	        //System.out.println(arr.size());
	        for (ImgLst imgs : arr) {
	            this.imgrep.deleteById(imgs.getId());
	        }
	        this.Postsrep.deleteById(p.getId());

	        return ResponseEntity.ok().body("dados deletados");
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	@GetMapping("/usrImgs/{name}")
	public ResponseEntity<List<PostsDTO>> getUsrListPosts(@PathVariable String name) {
		Users u = this.Usersrep.findByName(name);
		if(u!=null) {
			return ResponseEntity.ok().body(getDataPostsUser(u));
		}else {
			return ResponseEntity.notFound().build();
		}
		//List<Posts> lstP =
		/*
		String sql = "SELECT * FROM POSTS P WHERE P.USER_ID = ?";
		List<Posts> lstP = this.jdbc.query(sql,new Object[]{u.getId()},
	            new BeanPropertyRowMapper<>(Posts.class));
		List<PostsDTO> lst = new ArrayList<>();
		for(Posts res: lstP) {
			PostsDTO mimdto = new PostsDTO();
			mimdto.setTitle(res.getTitle());
			mimdto.setDesc(res.getDesc());
			mimdto.setId(res.getId());
			mimdto.setImg(returnimgs(res.getId()));
			lst.add(mimdto);
		}*/
		//return ResponseEntity.ok().body(getDataPostsUser(u));
	}
	public List<PostsDTO> getDataPostsUser(Users u){
		String sql = "SELECT * FROM POSTS P WHERE P.USER_ID = ?";
		RowMapper<Posts> rowMapper = (rs, rowNum) -> {
		    Posts post = new Posts();
		    //post.setUserId(rs.getInt("USER_ID")); // Mapeamento manual
		    post.setId(rs.getLong("ID"));
		    post.setTitle(rs.getString("TITLE"));
		    post.setDesc(rs.getString("DESCRIPTION"));
		    // Adicione outros campos conforme necessário
		    return post;
		};
		List<Posts> lstP = this.jdbc.query(
		        sql,
		        new Object[]{u.getId()},
		        rowMapper//new BeanPropertyRowMapper<>(Posts.class)
		    );
		List<PostsDTO> lst = new ArrayList<>();
		for(Posts res: lstP) {
			PostsDTO mimdto = new PostsDTO();
			mimdto.setTitle(res.getTitle());
			mimdto.setDesc(res.getDesc());
			System.out.println(res.getDesc());
			mimdto.setId(res.getId());
			mimdto.setImg(returnimgs(res.getId()));
			lst.add(mimdto);
		}
		return lst; 
	}
	@GetMapping("/lstImgs")
	public ResponseEntity<List<PostsDTO>> getPosts(){
		return ResponseEntity.ok().body(getAllPosts());
	}
	public List<PostsDTO> getAllPosts() {
		List<PostsDTO> lst = new ArrayList<>();
		for(Posts res: this.Postsrep.findAll()) {
			PostsDTO mimdto = new PostsDTO();
			mimdto.setTitle(res.getTitle());
			mimdto.setDesc(res.getDesc());
			mimdto.setId(res.getId());
			mimdto.setImg(returnimgs(res.getId()));
			lst.add(mimdto);
		}
		return lst;
	}
	public List<ImgLst> returnimgs(long num) {
		String sql = "SELECT * FROM IMG_LST AS IMG WHERE IMG.post_id = ?";
		 List<ImgLst> imagens = jdbc.query(
		            sql, 
		            new Object[]{num},  // Adicionando os curingas para LIKE
		            new BeanPropertyRowMapper<>(ImgLst.class)
		        );
		List<ImgLst> lst = new ArrayList<>();
		int inc=0;
		for(ImgLst res : imagens) {
			ImgLst arr = new ImgLst();
			arr.setImg(res.getImg());
			arr.setId(res.getId());;
			lst.add(arr);
		}
		return lst;
	}
	//Insert - Imgs
	@PostMapping("/posts/{name}")
	@Transactional
	public ResponseEntity<PostsDTO> IsrtPosts(
			//@RequestBody PostsDTO reqB,
			  @RequestParam("title") String title,@RequestParam("desc") String description,
			    @RequestParam("files") List<MultipartFile> files,
			@PathVariable("name") String usrName) {
		PostsDTO pdto = new PostsDTO();
		pdto.setTitle(title);
		pdto.setDesc(description);
		List<ImgLst> lst = getLst(files);
		pdto.setImg(lst);
		insrtTabPosts(pdto,usrName);
		return ResponseEntity.ok().body(pdto);
	}
	public void insrtTabPosts(PostsDTO pdto,String usrName) {
		Users u = this.Usersrep.findByName(usrName);
		Posts p = new Posts();
		p = this.ToPosts(pdto, "c");
		p.setUser(u);
		System.out.println("here---------------------");
		System.out.println(p.getTitle()+" - "+p.getDesc()+" - "+p.getUser()+" - "+p.getImg().size());
		//Posts ps = this.Postsrep.save(p);
		//System.out.println(ps.getTitle()+" - "+ps.getDesc()+" - "+ps.getUser()+" - "+ps.getImg().size());
		
		List<ImgLst> imgs = pdto.getImg();
	    for (ImgLst img : imgs) {
	        img.setPost(p); // Define a referência do post na imagem
	    }
	    p.setImg(imgs);

	    // Salva o post com as imagens corretamente associadas
	    Posts ps = this.Postsrep.save(p);
	    insrtImgs(pdto.getImg(),ps);
		
	}
	public void insrtImgs(List<ImgLst> img,Posts p) {
		for(ImgLst im: img){
			im.setPost(p);
			this.imgrep.save(im);
		}
	}
	public List<ImgLst> getLst(List<MultipartFile> files) {
		List<ImgLst> lst = new ArrayList<>();
		for (MultipartFile file : files) {
			ImgLst imgLDto = new ImgLst();
	    	try {
				imgLDto.setImg(file.getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	lst.add(imgLDto);
	    }
		return lst;
	}
	
	/*
	@GetMapping()
	public String GetUsr() {
		return "ok";
	}
	
	@PostMapping
	public ResponseEntity<?> insertUser(@RequestBody UsersDTO dto) {
	    Users u = this.toUsers(dto, "c");
	    boolean userExists = false;
	    if(findUserName(u)) {
	    	userExists = true;
	    }
	    if (userExists) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(new invalidUser("usuário já cadastrado"));
	    } else {
	        return ResponseEntity.ok(this.Usersrep.save(u));
	    }
	}
	public boolean getVal(Users u) {
	    Integer res = Usersrep.checkUser(u.getName(), u.getPass());
	    return res != null && res == 1;
	}
	public boolean findUserName(Users u) {
	    Integer res = Usersrep.findUser(u.getName());
	    return res != null && res == 1;
	}*/
	/*
	public ResponseEntity<UsersDTO> logUser(){
	}*/
	public PostsDTO ToPostsDTO(Posts post) {
		PostsDTO udto = new PostsDTO();
		udto.setId(post.getId());
		udto.setTitle(post.getTitle());
		udto.setDesc(post.getDesc());
		udto.setUser(post.getUser());
		udto.setImg(post.getImg());
		return udto;
	}
	public ImgLst TOImgLst(ImgLstDTO imgdto,String status) {
		ImgLst imgl = new ImgLst();
		if(status.equalsIgnoreCase("c")) {
			imgl.setId(null);
		}else {
			imgl.setId(imgdto.getId());
		}
		imgl.setImg(imgdto.getImg());
		imgl.setPost(imgdto.getPost());
		return imgl;
	}
	public ImgLstDTO TOImgLstDTO(ImgLst imgdto) {
		ImgLstDTO imgl = new ImgLstDTO();
		imgl.setId(imgdto.getId());
		imgl.setImg(imgdto.getImg());
		imgl.setPost(imgdto.getPost());
		return imgl;
	}
	public Posts ToPosts(PostsDTO post,String status) {
		Posts udto = new Posts();
		if(status.equalsIgnoreCase("c")) {
			udto.setId(null);
		}else {
			udto.setId(post.getId());
		}
		udto.setTitle(post.getTitle());
		udto.setDesc(post.getDesc());
		udto.setUser(post.getUser());
		udto.setImg(post.getImg());
		return udto;
	}
	
	
	public UsersDTO ToUsersDTO(Users user) {
		UsersDTO udto = new UsersDTO();
		udto.setId(user.getId());
		udto.setName(user.getName());
		udto.setEmail(user.getEmail());
		udto.setPass(user.getPass());
		return udto;
	}
	
	public Users toUsers(UsersDTO user,String status) {
		Users u = new Users();
		if(status.equalsIgnoreCase("c")) {
			u.setId(null);
		}else {
			u.setId(user.getId());
		}
		u.setName(user.getName());
		u.setEmail(user.getEmail());
		u.setPass(user.getPass());
		return u;
	}
}
