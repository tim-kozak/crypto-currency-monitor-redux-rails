class ExtractAuthToken
  include Interactor

  ## Find user service object
  # @param headers
  # @return auth_token
  def call
    headers = context.headers
    context.fail!(message: "ExtractAuthToken - no headers passed") unless headers
    context.fail!(message: "ExtractAuthToken - no Authorization header") unless headers['Authorization'].present?

    tokens = headers['Authorization'].split(' ')
    context.auth_token = tokens.size > 1 ? tokens.last : nil
    context.fail!(message: "ExtractAuthToken - no auth token found") unless context.auth_token
  end
end
