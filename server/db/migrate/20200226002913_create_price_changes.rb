class CreatePriceChanges < ActiveRecord::Migration[6.0]
  def change
    create_table :price_changes do |t|
      t.timestamp :day
      t.float :price
      t.references :currency, null: false, foreign_key: true

      t.timestamps
    end
  end
end
