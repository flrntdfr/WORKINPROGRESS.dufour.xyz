# Jekyll Build Timer Plugin
# Measures build time and makes it available to templates

module Jekyll
  class BuildTimer
    def self.start_time
      @start_time ||= Time.now
    end

    def self.end_time
      @end_time ||= Time.now
    end

    def self.duration
      end_time - start_time
    end

    def self.duration_formatted
      duration.round(3)
    end
  end

  # Hook into Jekyll's build process
  Hooks.register :site, :pre_render do |site|
    BuildTimer.start_time
  end

  Hooks.register :site, :post_write do |site|
    BuildTimer.end_time
  end

  # Make build time available to templates
  class Site
    def build_duration
      Jekyll::BuildTimer.duration_formatted
    end

    def build_start_time
      Jekyll::BuildTimer.start_time
    end

    def build_end_time
      Jekyll::BuildTimer.end_time
    end
  end
end 