# app/auth/authenticate_user.rb
class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # Service entry point
  def call
    result = AuthenticationOrganizer.call( email: @email, password: @password )
    if result.success?
      return result.auth_token
    else
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end

end