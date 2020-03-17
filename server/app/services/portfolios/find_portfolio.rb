class FindPortfolio
  include Interactor

  ## Find portfolio service object
  # @param id
  def call
    context.portfolio = Portfolio.find(context.id)
  end
end
