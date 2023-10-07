package com.example.had.repository;

import com.example.had.entity.Doctor;
import com.example.had.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    @Query("select d from Doctor d where d.isVerified = ?1 order by d.registrationStamp DESC")
    List<Doctor> findByIsVerifiedOrderByRegistrationStampDesc(boolean isVerified);
    @Transactional
    @Modifying
    @Query("update Doctor d set d.isVerified = ?1 where d.id = ?2")
    int updateIsVerifiedById(boolean isVerified, UUID id);
    @Query("select d from Doctor d where d.patientLimit > d.patientCount and d.isVerified = true ")
    List<Doctor> findByPatientLimitAndPatientCount();
    @Transactional
    @Modifying
    @Query("update Doctor d set d.specialisation = ?1, d.contact = ?2, d.address = ?3, d.imageUrl = ?4, d.patientLimit = ?5 " +
            "where d.id = ?6")
    int updateSpecialisationAndContactAndAddressAndImageUrlAndPatientLimitById(String specialisation,
                                                                               String contact,
                                                                               String address,
                                                                               String imageUrl,
                                                                               int patientLimit,
                                                                               UUID id);
    @Query("select d from Doctor d where upper(d.email) = upper(?1)")
    Doctor findByEmailIgnoreCase(String email);
    @Query("select d from Doctor d where d.userList = ?1")
    List<Doctor> findByUserList(User userList);
    @Query("select d from Doctor d where d.isVerified = ?1")
    List<Doctor> findByIsVerified(boolean isVerified);
    @Transactional
    @Modifying
    @Query("update Doctor d set d.isVerified = ?1 where upper(d.email) = upper(?2)")
    int updateIsVerifiedByEmailIgnoreCase(boolean isVerified, @NonNull String email);
    Doctor findByEmail(String email);
}
