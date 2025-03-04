package com.LoginRegister.example.service;

import com.LoginRegister.example.entity.Review;
import com.LoginRegister.example.repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    ReviewRepo reviewRepo;
    public  Review createReview(Review r, MultipartFile imageFile) throws IOException {

        r.setImageName(imageFile.getOriginalFilename());
        r.setImageType(imageFile.getContentType());
        r.setImageDate(imageFile.getBytes());
        reviewRepo.save(r);
        return r;
    }
    public List<Review> getReviewsByDestination(String destination) {
        return reviewRepo.findByDestination(destination);
    }

    public void deleteReview(Long id) {
        Optional<Review> review = reviewRepo.findById(id);
        if (review.isPresent()) {
            reviewRepo.deleteById(id);
        } else {
            throw new RuntimeException("Review not found");
        }
    }


    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }



}
