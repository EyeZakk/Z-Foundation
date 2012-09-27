# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!
# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.

# You may delete the code block below (up to the "exit" invocation)
# once you have set a unique secret key
puts <<-EOS
  
  Z FOUNDATION ERROR:
    You must set a unique secret token for this application.  To do so, edit
    config/initializers/secret_token.rb

    (you can randomly generate such a token by calling "::SecureRandom.hex(64)")

EOS
exit

ZFoundation::Application.config.secret_token = 'set me to a random 64 char string'