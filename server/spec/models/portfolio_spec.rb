require 'rails_helper'

RSpec.describe Portfolio, type: :model do

  it { should validate_presence_of(:name) }
  it { should have_many(:assets).dependent(:destroy) }
  it { should belong_to(:user) }

end