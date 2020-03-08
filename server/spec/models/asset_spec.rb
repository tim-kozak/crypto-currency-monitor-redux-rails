require 'rails_helper'

RSpec.describe Asset, type: :model do

  it { should validate_presence_of(:amount) }

  it { should belong_to(:currency) }
  it { should belong_to(:portfolio) }

end
