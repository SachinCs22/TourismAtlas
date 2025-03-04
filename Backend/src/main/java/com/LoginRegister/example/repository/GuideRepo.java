package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface GuideRepo extends JpaRepository<Guide,Long> {
    Optional<Guide> findByEmail(String userId);

    List<Guide> findByLocation(String location);

}
