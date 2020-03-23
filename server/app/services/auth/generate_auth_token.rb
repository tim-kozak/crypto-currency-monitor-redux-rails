class GenerateAuthToken
  include Interactor

  ## Find user service object
  # @param user
  def call
    user = context.user
    context.fail!(message: "GenerateAuthToken - no user provided") unless user

    context.auth_token = JsonWebToken.encode(user_id: user.id)

    context.fail!(message: "GenerateAuthToken - couldn't generate token") unless context.auth_token
  end
end
