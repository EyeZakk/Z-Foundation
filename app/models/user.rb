class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation
  
  devise :database_authenticatable, :registerable, :recoverable

  validates :email, :presence => true, 
            :format => /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/, 
            :uniqueness => true     
end