class Api::V1::PortfoliosController < ApplicationController

  before_action :set_portfolio, only: [:show, :update, :destroy]

  # GET /api/v1/portfolios
  def index
    result = GetPortfolios.call()
    if result.success?
      json_response(result.portfolios)
    end
  end

  # POST /api/v1/portfolios
  def create
    # create portfolio belonging to current user
    result = CreatePortfolio.call({ user: current_user, create_params: portfolio_params})
    if result.success?
      json_response(result.portfolio, :created)
    end
  end

  # GET /api/v1/portfolios/:id
  def show
    json_response(@portfolio)
  end

  # PUT /api/v1/portfolios/:id
  def update
    result = UpdatePortfolio.call({ portfolio: @portfolio, update_params: portfolio_params})
    if result.success?
      head :no_content
    end
  end

  def destroy
    result = DestroyPortfolio.call({ portfolio: @portfolio })
    if result.success?
      head :no_content
    end
  end

  private

  def portfolio_params
    params.permit(:name)
  end

  def set_portfolio
    result = FindPortfolio.call({ id: params[:id] })
    if result.success?
      @portfolio = result.portfolio
    end
  end

end
