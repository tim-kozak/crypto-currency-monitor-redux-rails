class DestroyPortfolio
  include Interactor

  ## Destroy portfolio service object
  # @param portfolio
  def call
    context.portfolio.destroy
  end
end
