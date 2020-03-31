class Api::V1::CurrenciesController < ApplicationController

  before_action :set_currency, only: [:show, :update, :destroy]

  # GET /api/v1/currencies
  def index
    result = GetCurrencies.call()
    if result.success?
      json_response(result.currencies)
    end
  end

  # POST /api/v1/currencies
  def create
    result = CreateCurrency.call({ create_params: currency_params})
    if result.success?
      json_response(result.currency, :created)
    end
  end

  # GET /api/v1/currencies/:id
  def show
    json_response(@currency)
  end

  # PUT /api/v1/currencies/:id
  def update
    result = UpdateCurrency.call({ currency: @currency, update_params: currency_params})
    if result.success?
      head :no_content
    end
  end

  def destroy
    result = DestroyCurrency.call({ currency: @currency })
    if result.success?
      head :no_content
    end
  end

  private

  def currency_params
    # whitelist params
    params.permit(:name, :symbol )
  end

  def set_currency
    result = FindCurrency.call({ id: params[:id] })
    if result.success?
      @currency = result.currency
    end
  end
end
