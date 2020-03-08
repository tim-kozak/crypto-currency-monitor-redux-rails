class User < ApplicationRecord
  has_secure_password

  has_many :portfolios
  validates_presence_of :name, :email, :password_digest
end