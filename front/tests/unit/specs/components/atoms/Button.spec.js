import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Button from "@/components/atoms/Button.vue";

describe("Button", () => {
  describe("プロパティ", () => {
    describe("disabled", () => {
      describe("デフォルト", () => {
        it("disbled属性が付与されていないこと", () => {
          const button = mount(Button);
          expect(button.attributes().disabled).to.be.an("undefined");
        });
      });

      describe("true", () => {
        it("disbled属性が付与されていること", () => {
          const button = mount(Button, {
            propsData: { disabled: true },
          });
          expect(button.attributes().disabled).to.equal("disabled");
        });
      });

      describe("false", () => {
        it("disbled属性が付与されていないこと", () => {
          const button = mount(Button, {
            propsData: { diabled: false },
          });
          expect(button.attributes().disabled).to.be.an("undefined");
        });
      });
    });
  });

  describe("イベント", () => {
    describe("click", () => {
      it("発行されていること", () => {
        const button = mount(Button);
        button.trigger("click");
        expect(button.emitted().click.length).to.equal(1);
      });
    });
  });

  describe("スロット", () => {
    describe("コンテンツ挿入あり", () => {
      it("挿入されていること", () => {
        const button = mount(Button, {
          slots: { default: "<p>hello</p>" },
        });
        expect(button.text()).to.equal("hello");
      });
    });

    describe("コンテンツ挿入なし", () => {
      it("挿入されていないこと", () => {
        const button = mount(Button);
        expect(button.text()).to.equal("");
      });
    });
  });
});
