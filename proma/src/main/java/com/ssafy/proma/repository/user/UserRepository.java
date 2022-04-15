package com.ssafy.proma.repository.user;

import com.ssafy.proma.model.entity.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {

  Optional<User> getUserByNickname(String nickname);

}
