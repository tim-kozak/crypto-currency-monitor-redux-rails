require 'rails_helper'

RSpec.describe AuthenticationOrganizer do

  describe '.call' do
    let(:user) { create(:user) }
    let(:valid_email) { user.email }
    let(:valid_password) { user.password }
    let(:invalid_email) { "some@email.com" }

    context "when emai is valid" do
      let(:context) { AuthenticationOrganizer.call(email: valid_email, password: valid_password) }

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "provides the user's secret token" do
        expect(context.auth_token).to be_present
      end
    end

    context "when email is not valid" do
      let(:context) { AuthenticationOrganizer.call(email: invalid_email, password: valid_password) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

  end
end
