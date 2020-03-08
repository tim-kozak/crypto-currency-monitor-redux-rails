class Api::V1::PortfoliosController < ApplicationController

  before_action :set_portfolio, only: [:show, :update, :destroy]

  # GET /api/v1/portfolios
  def index
    @portfolios = current_user.portfolios
    json_response(@portfolios)
  end

  # POST /api/v1/portfolios
  def create
    # create portfolio belonging to current user
    @portfolio = current_user.portfolios.create!(portfolio_params)
    json_response(@portfolio, :created)
  end

  # GET /api/v1/portfolios/:id
  def show
    json_response(@portfolio)
  end

  # PUT /api/v1/portfolios/:id
  def update
    @portfolio.update(portfolio_params)
    head :no_content
  end

  def destroy
    @portfolio.destroy
    head :no_content
  end

  private

  def portfolio_params
    params.permit(:name)
  end

  def set_portfolio
    @portfolio = Portfolio.find(params[:id])
  end

end
