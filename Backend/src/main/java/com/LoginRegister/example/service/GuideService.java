package com.LoginRegister.example.service;

import com.LoginRegister.example.DTO.GuideBookingDto;
import com.LoginRegister.example.entity.Guide;
import com.LoginRegister.example.entity.GuideBooking;
import com.LoginRegister.example.entity.Users;
import com.LoginRegister.example.repository.GuideBookingRepo;
import com.LoginRegister.example.repository.GuideRepo;
import com.LoginRegister.example.requests.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GuideService {

    @Autowired
    GuideRepo guideRepo;
    @Autowired
    GuideBookingRepo guideBookingRepo;

    public Guide addGuide(Guide guide) {

        return guideRepo.save(guide);

    }

    public long loginGuide(LoginRequest loginRequest) {

        Optional<Guide> user = guideRepo.findByEmail(loginRequest.getUserId());
        Guide user1 = user.get();

        if(user1 == null) {
            return -1;
        }



        if(!user1.getPassword().equals(loginRequest.getPassword())) {
            return -1;
        }

        return user1.getId();



    }


        public Guide getGuideById(long id) {
            return guideRepo.findById(id).orElse(null);
        }

    public Optional<Guide> getGuideByEmail(String email) {

        return guideRepo.findByEmail(email);

    }

    public List<Guide> getGuideByLocation(String location) {

        return guideRepo.findByLocation(location);
    }



    public List<GuideBookingDto> getBookingsByGuideId(Long guideId){
        List<GuideBooking> guideBookingList=guideBookingRepo.findAllByGuideId(guideId);
        List<GuideBookingDto> guideBookingDtos=new ArrayList<>();
        for(GuideBooking gb:guideBookingList){
            GuideBookingDto gbd=new GuideBookingDto(gb);
            guideBookingDtos.add(gbd);
        }
        return guideBookingDtos;
    }


//    @Scheduled(cron = "0 0 0 * * ?")
//    public void resetBookings() {
//        List<Guide> guides = guideRepo.findAll();
//        guides.forEach(guide -> guide.setIsBooked(false));
//        guideRepo.saveAll(guides);
//    }

//    public Guide updateGuide(Guide guide, LocalDate bookingDate) {
//        List<Date> dates= guide.getDates();
//        if (dates == null) {
//            dates = new ArrayList<>();
//        }
//        if(!dates.contains(bookingDate)) {
//            dates.add(bookingDate);
//            guide.setDates(dates);
//            return guideRepo.save(guide);
//        }
//        return null;
//
//    }
}
