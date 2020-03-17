class CreateCurrency
  include Interactor

  ## Create currency service object
  # @param create_params
  def call
    params = context.create_params
    context.currency = Currency.create!(params)
  end
end
