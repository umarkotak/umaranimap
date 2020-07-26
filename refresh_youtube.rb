require 'bundler/setup'
require 'json'
require 'net/http'
require 'pry'

class RefreshYoutube
  def initialize
    @items = []
  end

  def call
    for i in 1..50 do
      target_url = URI.parse(url_builder)
      response = Net::HTTP.get(target_url)
      response_parsed = JSON.parse(response, symbolize_names: true)
      @nextPageToken = response_parsed[:nextPageToken]
      @items += response_parsed[:items].map do |item|
        next if !item[:snippet][:title].include?('[English Sub]')
        {
          video_id: item[:id][:videoId],
          video_name: item[:snippet][:title]
        }
      end
    end
    @items.compact!

    binding.pry
  end

  def url_builder
    host = 'https://www.googleapis.com/youtube/v3/search?'
    params = [
      'key=AIzaSyDL9jzmqn7zo2EDs0LGT82wu3_sQykZqaE',
      'channelId=UCGbshtvS9t-8CW11W7TooQg',
      'part=snippet,id',
      'order=date',
      'maxResults=50'
    ]
    params << "pageTokenq=#{@nextPageToken}" if @nextPageToken
    host + params.join('&')
  end
end

RefreshYoutube.new.call
