class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :portfolios
  def portfolios
    ActiveModel::SerializableResource.new(object.portfolios,  each_serializer: PortfolioSerializer)
  end
end
