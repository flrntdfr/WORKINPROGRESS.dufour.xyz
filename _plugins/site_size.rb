module Jekyll
  class SiteSize < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      total_size = 0
      
      # Walk through all files in the current directory
      # Standard glob excludes dotfiles by default
      Dir.glob('**/*') do |file|
        
        # Skip _site directory
        next if file.start_with?('_site')
        
        # Add file size if it's a regular file
        # Rescue errors for broken symlinks or permission issues
        begin
          if File.file?(file)
            total_size += File.size(file)
          end
        rescue
          next
        end
      end
      
      # Convert to Megabytes and format to 1 decimal place
      megabytes = total_size / 1024.0 / 1024.0
      "#{'%.1f' % megabytes}"
    end
  end
end

Liquid::Template.register_tag('site_size_MB', Jekyll::SiteSize)