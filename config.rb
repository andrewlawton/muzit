# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

#activate :autoprefixer do |prefix|
#  prefix.browsers = "last 2 versions"
#end


set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Reload the browser automatically whenever files change
configure :development do
  set :domain_name, "http://localhost:4567"
  activate :livereload
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  # "Ignore" JS and CSS so webpack has full control.
  #ignore { |path| path =~ /\/(.*)\.js|css$/ && $1 != "all" && $1 != "vendor" }

  # Minify Javascript on build
  activate :minify_javascript

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets
  config[:relative_links] = true

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :external_pipeline,
   name: :webpack,
   command: build? ? 'npm run build' : 'npm run start',
   source: '.tmp/dist',
   latency: 1

config[:js_dir] = 'assets/javascripts'
config[:css_dir] = 'assets/stylesheets'
