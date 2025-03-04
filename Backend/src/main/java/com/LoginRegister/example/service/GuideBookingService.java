package com.LoginRegister.example.service;

import com.LoginRegister.example.entity.Guide;
import com.LoginRegister.example.entity.GuideBooking;
import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.GuideBookingRepo;
import com.LoginRegister.example.repository.GuideRepo;
import com.LoginRegister.example.repository.UsersRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Service
public class GuideBookingService {

    @Autowired
    private GuideBookingRepo guideBookingRepository;

    @Autowired
    private GuideRepo guideRepository;

    @Autowired
    private UsersRepo userRepository;

    public GuideBooking createBooking(Long userId, Long guideId, LocalDate bookingDate) {

        Optional<GuideBooking> existingBooking = guideBookingRepository.findByGuideIdAndBookingDate(guideId, bookingDate);
        if (existingBooking.isPresent()) {
            throw new IllegalArgumentException("The guide is already booked for this date.");
        }
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new RuntimeException("Guide not found"));

        GuideBooking booking = new GuideBooking(user, guide, bookingDate);

        return guideBookingRepository.save(booking);
    }

}

