class UpdateCurrency
  include Interactor

  ## Update currency service object
  # @param currency
  # @param update_params
  def call
    params = context.update_params
    context.currency.update(params)
  end
end
