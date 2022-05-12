package com.ssafy.proma.config.auth.provider;

import com.ssafy.proma.model.entity.user.User;
import org.springframework.context.annotation.Configuration;

@Configuration
public interface ClientProxy {

    public User getUserData(String accessToken);

}
