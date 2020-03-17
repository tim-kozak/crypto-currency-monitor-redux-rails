class GenerateAuthToken
  include Interactor

  ## Find user service object
  # @param user
  def call
    user = context.user
    context.fail! unless user
    context.auth_token = JsonWebToken.encode(user_id: user.id)
    context.fail! unless context.auth_token
  end
end
