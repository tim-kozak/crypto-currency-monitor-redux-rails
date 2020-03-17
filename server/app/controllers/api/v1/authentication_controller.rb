class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate

  # return auth token once user is authenticated
  def authenticate
    email = auth_params[:email]
    password = auth_params[:password]
    result = AuthenticationOrganizer.call( { email: email, password: password })
    if result.success?
      json_response(auth_token: result.auth_token)
    else
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end