class PriceChange < ApplicationRecord
  belongs_to :currency
  validates_presence_of :day
  validates_presence_of :price
end
