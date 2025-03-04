package com.LoginRegister.example.DTO;

import com.LoginRegister.example.entity.GuideBooking;

import java.time.LocalDate;

public class GuideBookingDto {

    private String touristName;
    private LocalDate bookingDate;
    private String touristMail;

    public String getTouristName() {
        return touristName;
    }

    public void setTouristName(String touristName) {
        this.touristName = touristName;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getTouristMail() {
        return touristMail;
    }

    public void setTouristMail(String touristMail) {
        this.touristMail = touristMail;
    }

    public GuideBookingDto(GuideBooking guideBooking) {
        this.touristName = guideBooking.getUser().getName();
        this.bookingDate = guideBooking.getBookingDate();
        this.touristMail = guideBooking.getUser().getEmail();

    }
}
