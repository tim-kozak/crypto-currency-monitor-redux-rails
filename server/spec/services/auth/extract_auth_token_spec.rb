require 'rails_helper'

RSpec.describe ExtractAuthToken do
  describe '.call' do
    let(:token) { "token" }
    let(:valid_header) { { "Authorization" => "test #{token}" } }
    let(:invalid_header) { { "Authorization" => "no_token" } }
    let(:invalid_headers) { {} }

    context "when headers is valid" do
      let(:context) { ExtractAuthToken.call(headers: valid_header) }

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "assign valid token" do
        expect(context.auth_token).to eq(token)
      end
    end

    context "when headers is not passed" do
      let(:context) { ExtractAuthToken.call(headers: nil) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

    context "when Authorization header is not valid" do
      let(:context) { ExtractAuthToken.call(headers: invalid_header) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

    context "when headers is not valid" do
      let(:context) { ExtractAuthToken.call(headers: invalid_headers) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end


  end

end
