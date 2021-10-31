import { expect } from "chai";
import Vue from "vue";
import Vuetify from 'vuetify';
import { createLocalVue, mount } from "@vue/test-utils";


import SignUpForm from "@/components/molecules/SignUpForm.vue";

Vue.use(Vuetify);

describe('SignUpForm', () => {
    describe('プロパティ', () => {
        describe('バリデーション', () => {
            const localVue = createLocalVue();
            let vuetify;
            let signUpForm;
            beforeEach(done => {
                vuetify = new Vuetify();
                signUpForm = mount(SignUpForm, {
                    localVue,
                    vuetify,
                    stubs: [ 'VTextField' ]
                });
                signUpForm.vm.$nextTick(done);
            })
            describe('email', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        it('emailがinvalidであること', () => {
                            signUpForm.setData({email: ''});
                            const error = signUpForm.vm.$refs.emailProvider.errors[0];
                            console.log(error);
                            // expect(signUpForm.vm.$refs.observer.invalid).to.be.false;
                            expect(error.text()).to.equal('メールアドレス を入力してください');
                        })
                    })
                })
            })
        })
    })
})