class Decimal
  def currency_formatted
    "%.2f" % self
  end
  
  # prefixes with "$" and makes 0.00 -> "free"
  def pretty_currency_formatted(options={})
    if self == 0.00
      "free"
    else
      if options[:no_dollar_sign]
        "#{self.currency_formatted}"
      else
        "$#{self.currency_formatted}"
      end
    end    
  end
end

class BigDecimal
  def currency_formatted
    "%.2f" % self
  end
  
  def pretty_currency_formatted(options={})
    if self == 0.00
      "free"
    else
      if options[:no_dollar_sign]
        "#{self.currency_formatted}"
      else
        "$#{self.currency_formatted}"
      end
    end
  end
end