module ErrorResponses
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  # JSON response with message; Status code 422 - unprocessable entity
  def response_unprocessable_entity(message)
    json_response({ message: message }, :unprocessable_entity)
  end

  # JSON response with message; Status code 404 - not found
  def response_not_found(message)
    json_response({ message: message }, :not_found)
  end

  # JSON response with message; Status code 401 - Unauthorized
  def response_unauthorized_request(message)
    json_response({ message: message }, :unauthorized)
  end

end