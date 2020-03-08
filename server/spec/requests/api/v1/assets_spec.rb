require 'swagger_helper'
require 'rails_helper'

RSpec.describe 'Assets API', type: :request do
  let(:user) { create(:user) }
  # authorize request
  let(:headers) { valid_headers }
  # let(:token) { token_generator(user.id) }
  let!(:currencies) { create_list(:currency, 5) }
  let!(:portfolios) { create_list(:portfolio, 5, user: user) }
  let!(:assets) { create_list(:asset, 5, currency: currencies.sample, portfolio: portfolios.sample ) }
  let(:asset_id) { assets.first.id }

  # path '/api/v1/assets' do
  #   get summary: "fetch assets list" do
  #     produces 'application/json'
  #     response 200, description: "successful"
  #   end
  # end
  #
  # path '/api/v1/assets/{asset_id}' do
  #   produces 'application/json'
  #
  #   parameter "asset_id", { in: :path, type: :integer }
  #   let(:asset_id) { assets.first.id }
  #
  #   parameter 'Authorization', { in: :header, type: :string }
  #   let(:'Authorization') { token }
  #
  #   get summary: "fetch asset item" do
  #     produces 'application/json'
  #     response 200, description: "success"
  #   end
  # end

  describe 'GET /api/v1/assets' do
    # make HTTP get request before each example
    before { get '/api/v1/assets', params: {}, headers: headers }

    it 'returns assets' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/assets/:id
  describe 'GET /api/v1/assets/:id' do
    before { get "/api/v1/assets/#{asset_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the assets' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(asset_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:asset_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Asset/)
      end
    end
  end

  # Test suite for POST /api/v1/assets
  describe 'POST /api/v1/assets' do
    context 'when the request is valid' do
      let(:valid_attributes) { { amount: 34.5, portfolio_id: portfolios.sample.id, currency_id: currencies.sample.id }.to_json }
      before { post '/api/v1/assets', params: valid_attributes, headers: headers }

      it 'creates an assets' do
        expect(json["amount"]).to eq(34.5)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { {}.to_json }
      before { post '/api/v1/assets', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
            .to match(/Validation failed: Currency must exist, Portfolio must exist, Amount can't be blank/)
      end
    end
  end

  # Test suite for PUT /api/v1/currencies/:id
  describe 'PUT /api/v1/assets/:id' do
    context 'when the record exists' do
      let(:valid_attributes) { { amount: 100.1 }.to_json }
      before { put "/api/v1/assets/#{asset_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /api/v1/assets/:id
  describe 'DELETE /api/v1/assets/:id' do

    context 'when item to delete exists' do
      before { delete "/api/v1/assets/#{asset_id}", params: {}, headers: headers }

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when item to delete does not exist' do
      let(:asset_id) { 100 }
      before { delete "/api/v1/assets/#{asset_id}", params: {}, headers: headers }

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Asset with 'id'=/)
      end
    end

  end

end
