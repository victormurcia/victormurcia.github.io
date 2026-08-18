source "https://rubygems.org"

gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# webrick is not bundled with Ruby 3+, needed for `jekyll serve`
gem "webrick", "~> 1.8"

# Windows / JRuby timezone data + faster file watching (skipped on Linux/CI)
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "wdm", "~> 0.1", platforms: [:mingw, :mswin, :x64_mingw]
