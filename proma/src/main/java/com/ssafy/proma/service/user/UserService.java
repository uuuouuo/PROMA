package com.ssafy.proma.service.user;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.user.UserDto.UserRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService extends AbstractService implements UserDetailsService {

    private final UserRepository userRepository;
    private final S3UploaderService s3UploaderService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    public Optional<User> checkUserNo(String userNo) {
        Optional<User> findUser = userRepository.findByNoAndIsDeleted(userNo, false);
        return findUser;
    }

    public Optional<User> checkUserNodeId(String userNodeId) {
        Optional<User> findUser = userRepository.findByNodeIdAndIsDeleted(userNodeId, false);
        return findUser;
    }

    public Map<String, Object> getByUserNo(String userNo) {

        Map<String, Object> resultMap = new HashMap<>();

        Optional<User> userOp = userRepository.findByNo(userNo);
        User findUser = takeOp(userOp);
        UserRes userRes = new UserRes();
        userRes.setNo(findUser.getNo());
        userRes.setNickname(findUser.getNickname());
        userRes.setProfileImage(findUser.getProfileImage());

        resultMap.put("userRes", userRes);
        resultMap.put("message", Message.USER_FIND_SUCCESS_MESSAGE);

        return resultMap;
    }

    @Transactional
    public Map<String, Object> update(MultipartFile multipartFile, String nickname, String dirName, String userNo) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();
        String imgUrl = s3UploaderService.upload(multipartFile, dirName, userNo);
        Optional<User> userOp = userRepository.findByNo(userNo);
        User findUser = takeOp(userOp);
        s3UploaderService.deleteFile(findUser.getProfileImage().replace("https://promaproject.s3.ap-northeast-2.amazonaws.com/", ""));
        findUser.updateUser(nickname, imgUrl);
        UserRes userRes = new UserRes();
        userRes.setNo(findUser.getNo());
        userRes.setNickname(findUser.getNickname());
        userRes.setProfileImage(findUser.getProfileImage());
        resultMap.put("userRes", userRes);
        resultMap.put("message", Message.USER_UPDATE_SUCCESS_MESSAGE);

        return resultMap;
    }
}
