class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create

  # GET me
  # return authenticated user
  def me
    render json: current_user, serializer: UserSerializer
  end

  # POST /signup
  # return authenticated token upon signup
  def create
    user_creation = CreateUser.call( create_params: user_params )
    user = nil
    if user_creation.success?
      user = user_creation.user
    end
    authentication = AuthenticationOrganizer.call( email: user.email, password: user.password )
    if authentication.success?
      response = { message: Message.account_created, auth_token: authentication.auth_token }
      json_response(response, :created)
    end
  end

  private

  def user_params
    params.permit(
        :name,
        :email,
        :password,
        :password_confirmation
    )
  end
end