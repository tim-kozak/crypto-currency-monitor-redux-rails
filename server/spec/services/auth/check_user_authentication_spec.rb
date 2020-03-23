require 'rails_helper'

RSpec.describe CheckUserAuthentication do
  describe '.call' do
    let(:user) { create(:user) }
    let(:valid_password) { user.password }
    let(:invalid_password) { "some" }

    context "when user and password is valid" do
      let(:context) { CheckUserAuthentication.call(user: user, password: valid_password) }

      it "succeeds" do
        expect(context).to be_a_success
      end
    end

    context "when user is not passed" do
      let(:context) { CheckUserAuthentication.call(user: nil, password: valid_password) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

    context "when password is not passed" do
      let(:context) { CheckUserAuthentication.call(user: user, password: nil ) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end

    context "when password is not valid" do
      let(:context) { CheckUserAuthentication.call(user: user, password: invalid_password ) }

      it "fails" do
        expect(context).to be_a_failure
      end

      it "provides a failure message" do
        expect(context.message).to be_present
      end
    end


  end

end
