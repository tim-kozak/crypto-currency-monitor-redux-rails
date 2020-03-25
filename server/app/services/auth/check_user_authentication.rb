class CheckUserAuthentication
  include Interactor

  ## Find user service object
  # @param user
  # @param password
  def call
    user = context.user
    context.fail!( message: "No user provided") unless user

    password = context.password
    context.fail!( message: "No password provided") unless password

    context.fail!( message: "Invalid credentials") unless user.authenticate(password)
  end
end
