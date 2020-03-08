class Currency < ApplicationRecord
  has_many :assets, dependent: :destroy
  has_many :price_changes, dependent: :destroy
  validates_presence_of :name, :symbol, :price, :last_change
end
