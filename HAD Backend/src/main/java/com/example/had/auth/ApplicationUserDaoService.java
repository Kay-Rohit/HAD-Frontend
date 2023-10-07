package com.example.had.auth;

import com.example.had.entity.Auth;
import com.example.had.repository.AuthRepository;
import com.example.had.security.ApplicationUserRole;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository("fake")
public class ApplicationUserDaoService implements ApplicationUserDao {

    private final PasswordEncoder passwordEncoder;
    private final AuthRepository loginRepository;

    @Autowired
    public ApplicationUserDaoService(PasswordEncoder passwordEncoder,
                                     AuthRepository loginRepository) {
        this.passwordEncoder = passwordEncoder;
        this.loginRepository = loginRepository;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers(username)
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }
    private List<ApplicationUser> getApplicationUsers(String username) {
        Auth applicationUser = loginRepository.findFirstByUsername(username);
        String inputRole = applicationUser.getRole();
        ApplicationUserRole userRole = ApplicationUserRole.valueOf(inputRole.toUpperCase());
        Set<SimpleGrantedAuthority> authorities = userRole.getGrantedAuthorities();

        List<ApplicationUser> applicationUsersList = Lists.newArrayList(
                new ApplicationUser(
                        applicationUser.getUsername(),
                        applicationUser.getPassword(),
                        authorities,
                        true,
                        true,
                        true,
                        true
                )
        );
        return applicationUsersList;
    }
}