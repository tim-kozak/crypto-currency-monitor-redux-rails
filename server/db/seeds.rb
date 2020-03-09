require 'faker'

puts "SEEDS START ------------------------------------------------------"

#Test user
email = "test@test.com"
password = "test"

user = User.find_by(email:email)
unless user
  user = User.create!(name: "John Doe", email: email, password: password)
  puts "Test user created"
else
  puts "Test user exist"
end

if Currency.all.size === 0
  currencies = (1..5).map do
    name = Faker::CryptoCoin.coin_name
    symbol = Faker::CryptoCoin.acronym
    price = Faker::Number.positive
    last_change = Faker::Date.between(from: DateTime.now - 1, to: DateTime.now)

    Currency.create!(name: name, symbol: symbol, price: price, last_change: last_change )
  end
  puts "Currencies created"

  3.times do
    name = Faker::Superhero.name
    portfolio = Portfolio.create!(name:name, user: user)

    4.times do
      amount = Faker::Number.decimal(l_digits: 3, r_digits: 3)
      Asset.create!(amount:amount, currency: currencies.sample, portfolio: portfolio)
    end
  end
  puts "Portfolios created"
  puts "Assets created"

else
  puts "Currencies exist"
  puts "Portfolios exist"
  puts "Assets exist"
end

puts "SEEDS END ------------------------------------------------------"
