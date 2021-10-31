require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /users" do
    it "works! (now write some real specs)" do
      get users_path
      expect(response).to have_http_status(200)
    end
  end
  
  describe "POST /users" do
    it "userを新規作成（成功）" do
      valid_params = { name: "abc", email: "abc@example.com", password: "password", password_confirmation: "password" }

      expect { post "/users", params: valid_params }.to change(User, :count).by(1)
      expect(response).to have_http_status(201)
    end
    it "userを新規作成（nameが空白）" do
      valid_params = { name: " ", email: "abc@example.com", password: "password", password_confirmation: "password" }

      expect { post "/users", params: valid_params }.to change(User, :count).by(0)
      expect(response).to have_http_status(400)
    end
  end
end