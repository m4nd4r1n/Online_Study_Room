package com.edu.opensky.image;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByMteId(String mteId);

    Optional<Image> findByStudyDateTime(LocalDateTime dateTime);
    Optional<Image> findByMteIdAndStudyDateTime(String userId, LocalDateTime dateTime);
}
