package com.LoginRegister.example.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Users {

	public Users() {

	}

	public Users(String email, String name, String password) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // Primary key field

	private String email;
	private String name;
	private String password;

	// Getters and Setters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	@OneToMany(mappedBy="user")
	private List<GuideBooking> bookings;

	@OneToMany(mappedBy="user")
	private List<Review> reviewList;
}
