class CreatePortfolio
  include Interactor

  ## Create portfolio service object
  # @param create_params
  # @param user
  def call
    params = context.create_params
    context.portfolio = context.user.portfolios.create!(params)
  end
end
