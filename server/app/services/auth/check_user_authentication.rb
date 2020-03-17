class CheckUserAuthentication
  include Interactor

  ## Find user service object
  # @param user
  # @param password
  def call
    user = context.user
    password = context.password
    context.fail! unless user && user.authenticate(password)
  end
end
