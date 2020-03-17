class FindCurrency
  include Interactor

  ## Find currency service object
  # @param id
  def call
    context.currency = Currency.find(context.id)
  end
end
