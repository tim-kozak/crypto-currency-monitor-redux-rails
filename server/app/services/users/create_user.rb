class CreateUser
  include Interactor

  ## Create user service object
  # @param create_params
  def call
    params = context.create_params
    context.user = User.create!(params)
  end
end
