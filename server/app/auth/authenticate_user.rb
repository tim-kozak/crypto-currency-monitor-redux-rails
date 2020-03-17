# app/auth/authenticate_user.rb
class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # Service entry point
  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  # verify user credentials
  def user
    result = FindUserByEmail.call( email: @email )
    if result.success?
      user_obj = result.user
      return user_obj if user_obj.authenticate(@password)
    end
    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end
end