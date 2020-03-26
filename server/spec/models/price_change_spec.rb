require 'rails_helper'

RSpec.describe PriceChange, type: :model do

  it { should validate_presence_of(:day) }
  it { should validate_presence_of(:price) }
  it { should belong_to(:currency) }

end