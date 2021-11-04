import flushPromises from "flush-promises";
import { mount, createLocalVue } from "@vue/test-utils";
import { ValidationProvider } from "vee-validate";
// import { expect } from "chai";
describe('とりま', () => {

    it('これできるとよき', async () => {
        const Vue = createLocalVue();
        // important to turn off the sync behavior.
        const wrapper = mount(
            {
            data: () => ({
                value: ""
            }),
            components: {
                ValidationProvider
            },
            template: `
            <ValidationProvider rules="required" name="input" v-slot="{ errors }" mode="eager">
                <input type="text" v-model="value">
                <span id="error">{{ errors[0] }}</span>
            </ValidationProvider>
            `
            },
            { sync: false, localVue: Vue }
        );
        const error = wrapper.find("#error");
        // No errors should be printed at the begining.
        console.log(error.text());

        wrapper.find("input").setValue("aaaa");
        // Wait for the validation and the DOM updates to settle down.
        await flushPromises();

        // An error message should be displayed now.
        console.log("okkkk");
        console.log(wrapper.find("input").element.value);
        console.log(error.text());
        console.log("why");
        // expect(error.text()).toBe("The input field is required.");
     }
    );
}
);

