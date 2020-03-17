class GetCurrencies
  include Interactor

  ## Get all currencies service object
  def call
    context.currencies = Currency.all
  end
end
