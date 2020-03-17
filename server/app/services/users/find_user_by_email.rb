class FindUserByEmail
  include Interactor

  ## Find user service object
  # @param email
  def call
    email = context.email
    context.user = User.find_by( email: email)
    context.fail! unless context.user
  end
end
