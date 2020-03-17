class UpdatePortfolio
  include Interactor

  ## Update portfolio service object
  # @param portfolio
  # @param update_params
  def call
    params = context.update_params
    context.portfolio.update(params)
  end
end
