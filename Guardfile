# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Add files and commands to this file, like the example:
#   watch(%r{file/path}) { `command(s)` }
#
guard 'shell' do
  # Calendar page
  watch(%r{^calendar/.*\.html$}) do |m|
    p = m[0].split('/')[1]
    if p == 'js'
      s = "Deploy HTML in JS\n" + `./deploy-js.sh calendar` + "Done"
      s << "Deploy tests\n" + `./deploy-test.sh calendar` + "Done"
    else
      "Deploy HTML\n" + `./deploy-html.sh calendar` + "Done"
    end
  end
  watch(%r{^calendar/.*\.js$}) do |m|
    s = "Deploy JS\n" + `./deploy-js.sh calendar` + "Done\n"
    s << "Deploy tests\n" + `./deploy-test.sh calendar` + "Done"
  end
  watch(%r{^calendar/.*\.css$}) do |m|
    "Deploy CSS\n" +  `./deploy-css.sh calendar` + "Done"
  end

  # Images
  watch(%r{^images/.*}) do |m|
    pth = "src/" + m[0]
    `cp #{pth} deploy/as/img`
    "Deployed > " + m[0]
  end
end
