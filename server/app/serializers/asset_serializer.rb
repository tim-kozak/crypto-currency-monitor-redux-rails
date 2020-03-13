class AssetSerializer < ActiveModel::Serializer
  attributes :id, :amount, :currency_id, :portfolio_id
end
