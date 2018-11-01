package entity;

import java.io.Serializable;

public class Result implements Serializable {
	private static final long serialVersionUID = 1L;
	private boolean success = true;
	private String message;

	public Result() {
	}

	public Result(String message) {
		this.message = message;
	}

	public Result(boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
