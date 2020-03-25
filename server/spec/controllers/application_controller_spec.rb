require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  let!(:user) { create(:user) }
  let(:headers) { { 'Authorization' => token_generator(user.id) } }
  let(:invalid_headers) { { 'Authorization' => nil } }

  describe "#authorize_request" do
    context "when auth token is passed" do
      it "sets the current user" do
        allow(request).to receive(:headers).and_return(headers)
        expect(subject.instance_eval { authorize_request }).to eq(user)
      end
    end

    # context "when auth token is not passed" do
    #   it "returns unprocessable_entity status" do
    #     allow(request).to receive(:headers).and_return(invalid_headers)
    #     allow(controller).to receive(:render)
    #     expect(response).to have_http_status(:unprocessable_entity)
    #     subject.instance_eval{ authorize_request }
    #   end
    #
    #   # it "shows message" do
    #   #   expect(response.body).to match(/message/)
    #   # end
    #
    # end
  end
end