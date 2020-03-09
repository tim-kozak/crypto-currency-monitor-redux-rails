class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :assets, serializer: AssetSerializer
end
