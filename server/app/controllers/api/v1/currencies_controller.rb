class Api::V1::CurrenciesController < ApplicationController

  before_action :set_currency, only: [:show, :update, :destroy]

  # GET /api/v1/currencies
  def index
    @currencies = Currency.all
    json_response(@currencies)
  end

  # POST /api/v1/currencies
  def create
    @currency = Currency.create!(currency_params)
    json_response(@currency, :created)
  end

  # GET /api/v1/currencies/:id
  def show
    json_response(@currency)
  end

  # PUT /api/v1/currencies/:id
  def update
    @currency.update(currency_params)
    head :no_content
  end

  def destroy
    @currency.destroy
    head :no_content
  end

  private

  def currency_params
    # whitelist params
    params.permit(:name, :symbol, :price, :last_change, :id )
  end

  def set_currency
    @currency = Currency.find(params[:id])
  end
end
