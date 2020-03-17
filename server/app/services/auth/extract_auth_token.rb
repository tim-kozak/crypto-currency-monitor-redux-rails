class ExtractAuthToken
  include Interactor

  ## Find user service object
  # @param headers
  # @return auth_token
  def call
    headers = context.headers
    if headers['Authorization'].present?
      context.auth_token = headers['Authorization'].split(' ').last
    else
      context.fail!
    end
  end
end
