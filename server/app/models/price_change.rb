class PriceChange < ApplicationRecord
  belongs_to :currency
  validates_presence_of :day
end
