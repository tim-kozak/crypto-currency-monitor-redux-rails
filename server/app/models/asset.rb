class Asset < ApplicationRecord
  belongs_to :currency
  belongs_to :portfolio

  validates_presence_of :amount

end
