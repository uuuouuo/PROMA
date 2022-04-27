package com.ssafy.proma.repository.user;

import com.ssafy.proma.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByNo(String userNo);
    Optional<User> getUserByNo(String userNo);
    Optional<User> findByNoAndIsDeleted(String userNo, Boolean deleted);
    Optional<User> findByNodeIdAndIsDeleted(String userNodeId, Boolean deleted);

}
