class Portfolio < ApplicationRecord
  has_many :assets, dependent: :destroy
  belongs_to :user
  validates_presence_of :name
end
