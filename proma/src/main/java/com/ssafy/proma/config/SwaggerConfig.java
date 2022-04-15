package com.ssafy.proma.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  //http://localhost:8080/swagger-ui.html#/

  @Bean
  public Docket swaggerApi() {
    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(swaggerInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.ssafy.proma.controller"))
            .paths(PathSelectors.any())
            .build()
            .useDefaultResponseMessages(false); // 기본으로 세팅되는 200,401,403,404 메시지를 표시 하지 않음
  }

  private ApiInfo swaggerInfo() {
    return new ApiInfoBuilder().title("Proma Swagger")
            .description("Proma API")
            .contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com"))
            .license("SSAFY License")
            .licenseUrl("ssafy@ssafy.com").version("1.0")
            .build();
  }

}
