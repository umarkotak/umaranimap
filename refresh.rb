require "json"
require "net/http"

class Refresh
  MAX_UPDATE_COUNT = 2.freeze
  MAX_MANGA_COUNT = -1.freeze
  MAX_NEW_MANGA_RETENTION = 10.freeze

  def initialize
  end

  def call
    log_file = File.open("update_log.txt", "w")

    puts "START UPDATING DATA: #{Time.now}"
    log_file.puts "START UPDATING DATA: #{Time.now}"
    log_file.puts "-----------------------------------------------------------"
    log_file.puts

    file = File.open("./src/components/data/play_ground.json")
    data = JSON.load(file)
    manga_db_hash = data["manga_db"]
    manga_titles = manga_db_hash.keys.drop(1)[0...MAX_MANGA_COUNT]
    updated_manga_titles = []

    manga_titles.each do |manga_title|
      manga = manga_db_hash[manga_title]
      last_chapter = manga["manga_last_chapter"].to_i
      next_target_chapter = last_chapter
      updated = false

      log_file.puts "START UPDATING: #{manga_title.upcase}"
      log_file.puts "EXISTING CHAPTER: #{last_chapter}"

      for i in 1..MAX_UPDATE_COUNT do
        manga_chapter_target = last_chapter + i
        target_url = URI.parse("https://img.mghubcdn.com/file/imghub/#{manga_title}/#{manga_chapter_target}/1.jpg")
        response = Net::HTTP.get(target_url)

        begin
          status = JSON.parse(response)["status"]
          status_string = (status == 200) ? "FOUND" : "NOT_FOUND"
        rescue
          updated = true
          status_string = "FOUND"
        end

        log_file.puts "FINDING CHAPTER: #{manga_chapter_target}, STATUS: #{status_string}"

        if status_string == "NOT_FOUND"
          break
        else
          next_target_chapter = manga_chapter_target
        end
      end

      data["manga_db"][manga_title]["manga_last_chapter"] = next_target_chapter
      if updated
        data["manga_db"][manga_title]["new_added"] = 1
      # elsif data["manga_db"][manga_title]["new_added"] >= MAX_NEW_MANGA_RETENTION
      #   data["manga_db"][manga_title]["new_added"] = 0
      elsif data["manga_db"][manga_title]["new_added"] != 0
        data["manga_db"][manga_title]["new_added"] += 1
      end

      updated_manga_titles << "#{manga_title.upcase}: #{next_target_chapter}".gsub("-", " ") if updated
      log_file.puts "UPDATED LATEST CHAPTER: #{next_target_chapter}"
      log_file.puts "-----------------------------------------------------------"
      log_file.puts
    end

    log_file.puts "UPDATING JSON DB - START"
    db_file = File.open("./src/components/data/play_ground.json", "w")
    db_file.puts data.to_json
    db_file.close
    log_file.puts "UPDATING JSON DB - FINISHED"
    log_file.puts

    log_file.puts updated_manga_titles
    log_file.puts

    puts updated_manga_titles

    puts "FINISH UPDATING DATA: #{Time.now}"
    log_file.puts "FINISH UPDATING DATA: #{Time.now}"

    log_file.close
  end
end

Refresh.new.call
