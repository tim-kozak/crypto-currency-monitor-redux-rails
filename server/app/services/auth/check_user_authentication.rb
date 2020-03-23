class CheckUserAuthentication
  include Interactor

  ## Find user service object
  # @param user
  # @param password
  def call
    user = context.user
    context.fail!( message: "CheckUserAuthentication - no user provided") unless user

    password = context.password
    context.fail!( message: "CheckUserAuthentication - no password provided") unless password

    context.fail!( message: "CheckUserAuthentication - invalid credentials") unless user.authenticate(password)
  end
end
