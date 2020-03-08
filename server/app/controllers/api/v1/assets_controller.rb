class Api::V1::AssetsController < ApplicationController

  before_action :set_asset, only: [:show, :update, :destroy]

  # GET /api/v1/assets
  def index
    @assets = Asset.all
    json_response(@assets)
  end

  # GET /api/v1/assets/:id
  def show
    json_response(@assets)
  end

  # POST /api/v1/assets
  def create
    @assets = Asset.create!(asset_params)
    json_response(@assets, :created)
  end

  # PUT /api/v1/assets/:id
  def update
    @assets.update(asset_params)
    head :no_content
  end

  # DELETE /api/v1/assets/:id
  def destroy
    @assets.destroy
    head :no_content
  end

  private

  def set_asset
    @assets = Asset.find(params[:id])
  end

  def asset_params
    # whitelist params
    params.permit(:amount, :currency_id, :portfolio_id )
  end
end
