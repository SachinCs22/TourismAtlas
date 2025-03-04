package com.LoginRegister.example.controller;


import com.LoginRegister.example.DTO.GuideBookingDto;
import com.LoginRegister.example.entity.Guide;
import com.LoginRegister.example.entity.GuideBooking;
import com.LoginRegister.example.requests.LoginRequest;
import com.LoginRegister.example.service.GuideBookingService;
import com.LoginRegister.example.service.GuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class GuideController {

    @Autowired
    GuideService guideService;

    @Autowired
    private GuideBookingService guideBookingService;

    @PostMapping("/addGuide")
    @CrossOrigin(origins="http://localhost:3000/addGuide")
    public Guide addGuide(@RequestBody Guide guide) {
        return guideService.addGuide(guide);
    }

    @PostMapping("/loginGuide")
    @CrossOrigin(origins = "http://localhost:3000/loginGuide")
    public long loginGuide(@RequestBody LoginRequest loginRequest) {

        return guideService.loginGuide(loginRequest);
    }

    @GetMapping("/homeGuide/{email}")
    @CrossOrigin(origins="http://localhost:3000/homeGuide/{email}")
    public ResponseEntity<Optional<Guide>> getReviewsByDestination(@PathVariable String email){
        Optional<Guide> guide = guideService.getGuideByEmail(email);
        if (guide.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(guide, HttpStatus.OK);
    }

//    @PostMapping("/bookGuide/{id}")
   // @CrossOrigin(origins = "http://localhost:3000/bookGuide/{id}"/)
//    public ResponseEntity<Guide> bookGuide(@PathVariable Long id, @RequestBody Map<String, Date> requestData) {
//        Guide guide = guideService.getGuideById(id);
//        Date bookingDate=requestData.get("bookingDate");
//        System.out.print(bookingDate+"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7");
//        if (guide!=null) {
//            Guide updatedGuide = guideService.updateGuide(guide,bookingDate);
//
//            if(updatedGuide==null){
//                return new ResponseEntity<>(guide, HttpStatus.BAD_REQUEST);
//            }
//
//            return new ResponseEntity<>(updatedGuide, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }


    @PostMapping("/create")
 //   @CrossOrigin(origins="http://localhost:3000/create")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> requestData) {
        try {
            Long userId = Long.valueOf(requestData.get("userId").toString());
            Long guideId = Long.valueOf(requestData.get("guideId").toString());
            LocalDate bookingDate = LocalDate.parse(requestData.get("bookingDate").toString());

            GuideBooking booking = guideBookingService.createBooking(userId, guideId, bookingDate);

            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/guide/{location}")
//    @CrossOrigin(origins="http://localhost:3000/guide/{location}")
    public ResponseEntity<List<Guide>> getGuideByLocation(@PathVariable String location){
        List<Guide> guides = guideService.getGuideByLocation(location);
        if (guides.isEmpty()) {
            return new ResponseEntity<>(guides,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(guides, HttpStatus.OK);
    }


    @GetMapping("/guide/bookings/{guideId}")
    public ResponseEntity<List<GuideBookingDto>> getBookingsByGuideId(@PathVariable Long guideId){
        return new ResponseEntity<>(guideService.getBookingsByGuideId(guideId), HttpStatus.OK);
    }

}
