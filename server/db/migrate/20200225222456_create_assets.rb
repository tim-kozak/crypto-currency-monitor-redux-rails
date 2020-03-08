class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.references :currency, null: false, foreign_key: true
      t.references :portfolio, null: false, foreign_key: true
      t.float :amount

      t.timestamps
    end
  end
end
