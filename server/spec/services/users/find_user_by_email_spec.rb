require 'rails_helper'

RSpec.describe FindUserByEmail do
  describe '.call' do

    context "when email is valid" do
      let(:user) { create(:user) }
      let(:context) { FindUserByEmail.call(email: user.email) }

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "provides valid user" do
        expect(context.user).to eq(user)
      end
    end

    context "when email is not valid" do
      let(:email) { "invalid@mail.com" }
      let(:context) { FindUserByEmail.call(email: email) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

  end
end