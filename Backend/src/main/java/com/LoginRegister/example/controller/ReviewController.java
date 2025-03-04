package com.LoginRegister.example.controller;


import com.LoginRegister.example.entity.Review;
import com.LoginRegister.example.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ReviewController {

    @Autowired
    ReviewService reviewService;





    @PostMapping("/addReview")
    @CrossOrigin(origins="http://localhost:3000/addReview")
    public ResponseEntity<?> addProduct(@RequestPart Review product,
                                        @RequestPart MultipartFile imageFile){
        try {
            Review product1 = reviewService.createReview(product, imageFile);
            return new ResponseEntity<>(product1,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews/{destination}")
    @CrossOrigin(origins="http://localhost:3000/reviews/{destination}")
    public ResponseEntity<List<Review>> getReviewsByDestination(@PathVariable String destination){
        List<Review> reviews = reviewService.getReviewsByDestination(destination);
        if (reviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @DeleteMapping("/reviews/{id}")
    @CrossOrigin(origins="http://localhost:3000/reviews/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
