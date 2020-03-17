class DestroyCurrency
  include Interactor

  ## Destroy currency service object
  # @param currency
  def call
    context.currency.destroy
  end
end
