class Currency < ApplicationRecord
  has_many :assets, dependent: :destroy
  has_many :price_changes, dependent: :destroy
  validates_presence_of :name, :symbol

  def price
    last_price_change.price
  end

  def last_change_date
    last_price_change.day
  end

  def last_price_change
    PriceChange.where(currency_id: self.id).limit(1).order("day desc").first
  end

end
