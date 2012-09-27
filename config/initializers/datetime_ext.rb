class DateTime
  def strip_date
    orig  = self
    DateTime.now.utc.change(:hour => orig.hour, :min => orig.min, :sec => orig.sec, :year => 2000, :month => 1, :day => 1)
  end
end