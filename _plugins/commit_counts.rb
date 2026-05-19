module Jekyll
  class CommitCounts < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      return "dev" if Jekyll.env == "development"

      count = `git rev-list --count WIP 2>/dev/null`.strip
      
      if $?.success?
        count
      else
        "1" 
      end
    end
  end
end

Liquid::Template.register_tag('commit_counts', Jekyll::CommitCounts)

