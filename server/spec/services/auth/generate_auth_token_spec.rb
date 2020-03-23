# spec/services/auth/generate_auth_token_spec.rb
require 'rails_helper'

RSpec.describe GenerateAuthToken do
  describe '.call' do

    context "when user is valid" do
      let(:user) { create(:user) }
      let(:context) { GenerateAuthToken.call(user: user) }
      let(:token) { "token" }

      before do
        allow(JsonWebToken).to receive(:encode).with(user_id: user.id).and_return(token)
      end

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "provides the user's secret token" do
        expect(context.auth_token).to eq(token)
      end
    end

    context "when user is invalid" do
      let(:user) { nil }
      let(:context) { GenerateAuthToken.call(user: user) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end

    end

    context "when token is not generated" do
      let(:user) { create(:user) }
      let(:context) { GenerateAuthToken.call(user: user) }

      before do
        allow(JsonWebToken).to receive(:encode).with(user_id: user.id).and_return(nil)
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
