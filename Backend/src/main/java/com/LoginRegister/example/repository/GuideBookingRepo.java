package com.LoginRegister.example.repository;

import com.LoginRegister.example.entity.GuideBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GuideBookingRepo extends JpaRepository<GuideBooking, Long> {
    Optional<GuideBooking> findByGuideIdAndBookingDate(Long guideId, LocalDate bookingDate);
    List<GuideBooking> findAllByGuideId(Long guideId);
}
