package edu.asix.api.classes;

public class Login {
	private String loginLoginUsername;
	private String loginLoginPassword;
	public Login(String loginLoginUsername, String loginLoginPassword) {
		super();
		this.loginLoginUsername = loginLoginUsername;
		this.loginLoginPassword = loginLoginPassword;
	}
	public String getLoginUsername() {
		return loginLoginUsername;
	}
	public void setLoginUsername(String loginLoginUsername) {
		this.loginLoginUsername = loginLoginUsername;
	}
	public String getLoginPassword() {
		return loginLoginPassword;
	}
	public void setLoginPassword(String loginLoginPassword) {
		this.loginLoginPassword = loginLoginPassword;
	}
	@Override
	public String toString() {
		return "Login [loginLoginUsername=" + loginLoginUsername + ", loginLoginPassword=" + loginLoginPassword + "]";
	}
	
	
}
