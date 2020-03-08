class CreateCurrencies < ActiveRecord::Migration[6.0]
  def change
    create_table :currencies do |t|
      t.string :name
      t.string :symbol
      t.float :price
      t.timestamp :last_change

      t.timestamps
    end
  end
end
