import {Selector, t} from 'testcafe';

export default class LoginPage {

    constructor() {
        // Inputs
        this.input_Username = Selector('input[name=Username]');
        this.input_Password = Selector('input[name=Password]');

        // Links
        this.link_ForgotPassword = Selector('.forgot-password');
        this.link_SignUp = Selector('.sign-up');

        // Actions
        this.btn_Submit = Selector('button[name=Login]');
    }

    async login(username = 'John', password = 'Password')
    {
        await t
            .typeText(this.input_Username, username)
            .typeText(this.input_Password, password)
            .expect(this.input_Username.value).contains(username)
            .click(this.btn_Submit)
    }
}
