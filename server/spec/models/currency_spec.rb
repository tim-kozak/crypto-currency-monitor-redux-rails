require 'rails_helper'

RSpec.describe Currency, type: :model do

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:symbol) }
  it { should validate_presence_of(:price) }
  it { should validate_presence_of(:last_change) }

  it { should have_many(:assets).dependent(:destroy) }
  it { should have_many(:price_changes).dependent(:destroy) }

end
