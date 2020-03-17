class FindCurrency
  include Interactor

  ## Find currency service object
  # @param id
  def call
    context.currency = Currency.find(context.id)
    context.fail! unless context.currency
  end
end
