require "rails_helper"

RSpec.describe HomeController, type: :controller do

  describe "home page" do
    it "rendering home page template" do
      get :index
      expect(response).to render_template("index")
    end
  end
end