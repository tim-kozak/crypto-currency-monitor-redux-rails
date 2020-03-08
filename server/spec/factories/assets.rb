FactoryBot.define do
  factory :asset do
    amount { Faker::Number.decimal(l_digits: 3, r_digits: 3) }
  end
end