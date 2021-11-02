module Service
    extend ActiveSupport::Concern
    class_methods do
        def call(*args)
            puts "okkkk"
            new.call(*args)
        end
    end
end