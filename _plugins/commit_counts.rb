module Jekyll
  class CommitCounts < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      # Execute the git command specified by the user
      count = `git rev-list --count WIP 2>/dev/null`.strip
      
      if $?.success?
        count
      else
        # Fallback if the command fails (e.g., if the repo is shallow or branch is missing)
        "1" 
      end
    end
  end
end

Liquid::Template.register_tag('commit_counts', Jekyll::CommitCounts)

