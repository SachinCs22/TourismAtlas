package com.LoginRegister.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.UsersRepo;
import com.LoginRegister.example.requests.LoginRequest;

@Service
public class UserService {
	
	@Autowired
	UsersRepo usersRepo;
	
	public Users addUser(Users user) {
		
		return usersRepo.save(user);
		
	}

	public long loginUser(LoginRequest loginRequest) {

		Optional<Users> user = usersRepo.findByEmail(loginRequest.getUserId());
		Users user1 = user.get();

		if(user1 == null) {
			return -1;
		}



		if(!user1.getPassword().equals(loginRequest.getPassword())) {
			return -1;
		}

		return user1.getId();



	}

}
