require 'rails_helper'

RSpec.describe 'Currencies API', type: :request do

  let(:user) { create(:user) }
  # authorize request
  let(:headers) { valid_headers }
  let!(:currencies) { create_list(:currency, 5) }
  let(:currency_id) { currencies.first.id }


  describe 'GET /api/v1/currencies' do
    # make HTTP get request before each example
    before { get '/api/v1/currencies', params: {}, headers: headers }

    it 'returns currencies' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/currencies/:id
  describe 'GET /api/v1/currencies/:id' do
    before { get "/api/v1/currencies/#{currency_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the currency' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(currency_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:currency_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Currency/)
      end
    end
  end

  # Test suite for POST /api/v1/currencies
  describe 'POST /api/v1/currencies' do
    context 'when the request is valid' do
      let(:valid_attributes) { { name: "Bitcoin", symbol: "BTX", price: 342.5634, last_change: "2020-12-08 11:26:40 -0200" }.to_json }
      before { post '/api/v1/currencies', params: valid_attributes, headers: headers }

      it 'creates a currency' do
        expect(json["name"]).to eq("Bitcoin")
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { {}.to_json }
      before { post '/api/v1/currencies', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
            .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /api/v1/currencies/:id
  describe 'PUT /api/v1/currencies/:id' do
    context 'when the record exists' do
      let(:valid_attributes) { { name: "FakeCoin", symbol: "TTT", }.to_json }
      before { put "/api/v1/currencies/#{currency_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /api/v1/currencies/:id
  describe 'DELETE /api/v1/currencies/:id' do

    context 'when item to delete exists' do
      before { delete "/api/v1/currencies/#{currency_id}", params: {}, headers: headers }

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when item to delete does not exist' do
      let(:currency_id) { 100 }
      before { delete "/api/v1/currencies/#{currency_id}", params: {}, headers: headers }

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Currency with 'id'=/)
      end
    end

  end

end