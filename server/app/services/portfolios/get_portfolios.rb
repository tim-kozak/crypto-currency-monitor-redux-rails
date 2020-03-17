class GetPortfolios
  include Interactor

  ## Get all portfolios service object
  def call
    context.portfolios = Portfolio.all
  end
end
