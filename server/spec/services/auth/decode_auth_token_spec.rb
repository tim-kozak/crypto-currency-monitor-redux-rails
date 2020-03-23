# spec/services/auth/generate_auth_token_spec.rb
require 'rails_helper'

RSpec.describe DecodeAuthToken do
  describe '.call' do

    let(:user) { create(:user) }
    let(:auth_token) { "token" }
    let(:auth_token_hash) { { user_id: user.id } }
    let(:context) { DecodeAuthToken.call(auth_token: auth_token) }

    context "when auth token is valid" do
      before do
        allow(JsonWebToken).to receive(:decode).with(auth_token).and_return(auth_token_hash)
      end

      it "succeeds" do
        expect(context).to be_a_success
      end
      it "returns valid id" do
        expect(context.id).to eq(user.id)
      end
    end

    context "when auth token is not valid" do
      before do
        allow(JsonWebToken).to receive(:decode).with(auth_token).and_return(nil)
      end

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

  end
end
