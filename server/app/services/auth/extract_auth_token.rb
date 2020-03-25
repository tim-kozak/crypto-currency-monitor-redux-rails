class ExtractAuthToken
  include Interactor

  ## Find user service object
  # @param headers
  # @return auth_token
  def call
    headers = context.headers
    context.fail!(message: "No headers provided") unless headers
    authorization = headers['Authorization']
    context.fail!(message: "No Authorization header") unless authorization

    context.auth_token = authorization.split(' ').last
    context.fail!(message: "No auth token provided") unless context.auth_token
  end
end
