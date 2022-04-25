package com.ssafy.proma.repository.user;

import com.ssafy.proma.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByNo(String userNo);
}
