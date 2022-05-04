package com.ssafy.proma.repository.user;

import com.ssafy.proma.model.entity.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByNo(String userNo);
    Optional<User> findByNoAndIsDeleted(String userNo, Boolean deleted);
    Optional<User> findByNodeIdAndIsDeleted(String userNodeId, Boolean deleted);
    Optional<User> findByRefresh(String refresh);

}
