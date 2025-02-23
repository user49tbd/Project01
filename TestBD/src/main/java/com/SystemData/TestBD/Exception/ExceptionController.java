package com.SystemData.TestBD.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
	@ExceptionHandler(invalidUser.class)
	public invalidUser userErrMsg(invalidUser u) {
		return new invalidUser(u.getMsg());
	}
}
