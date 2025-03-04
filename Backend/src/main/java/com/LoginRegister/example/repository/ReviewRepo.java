package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.Review;
import com.LoginRegister.example.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByDestination(String destination);
}
