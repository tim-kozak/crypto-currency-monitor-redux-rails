require 'rails_helper'

RSpec.describe 'Portfolios API', type: :request do

  let(:user) { create(:user) }
  # authorize request
  let(:headers) { valid_headers }
  let!(:currencies) { create_list(:currency, 5) }
  let!(:portfolios) { create_list(:portfolio, 5, user: user) }
  let!(:assets) { create_list(:asset, 5, currency: currencies.sample, portfolio: portfolios.sample ) }
  let(:portfolio_id) { portfolios.first.id }


  describe 'GET /api/v1/portfolios' do
    # make HTTP get request before each example
    before { get '/api/v1/portfolios', params: {}, headers: headers }

    it 'returns portfolios' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/portfolios/:id' do
    before { get "/api/v1/portfolios/#{portfolio_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the portfolio' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(portfolio_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:portfolio_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Portfolio/)
      end
    end
  end

  # Test suite for POST /api/v1/portfolios
  describe 'POST /api/v1/portfolios' do
    context 'when the request is valid' do
      let(:valid_attributes) { { name: "Investment" }.to_json }
      before { post '/api/v1/portfolios', params: valid_attributes, headers: headers }

      it 'creates a portfolios' do
        expect(json["name"]).to eq("Investment")
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { {}.to_json }
      before { post '/api/v1/portfolios', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
            .to match(/Validation failed: Name can't be blank/)
      end
    end
  end


  # Test suite for PUT /api/v1/portfolios/:id
  describe 'PUT /api/v1/portfolios/:id' do
    context 'when the record exists' do
      let(:valid_attributes) { { name: "Other name" }.to_json }
      before { put "/api/v1/portfolios/#{portfolio_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /api/v1/portfolios/:id
  describe 'DELETE /api/v1/portfolios/:id' do

    context 'when item to delete exists' do
      before { delete "/api/v1/portfolios/#{portfolio_id}", params: {}, headers: headers }

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when item to delete does not exist' do
      let(:portfolio_id) { 100 }
      before { delete "/api/v1/portfolios/#{portfolio_id}", params: {}, headers: headers }

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Portfolio with 'id'=/)
      end
    end

  end

end