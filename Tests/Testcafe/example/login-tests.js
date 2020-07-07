import { ClientFunction } from 'testcafe';
import LoginPage from "./pages/login-page-model";

const getPageUrl = ClientFunction(() => window.location.href.toString());

fixture`Login Page Tests`
    .page `localhost:8080/login`
    .httpAuth({
        username: 'webbeds',
        password: 'book!ngc3nt3r'
    });

const page = new LoginPage();

test('After login action there is a redirect to the search page', async t => {

    await page.login('John','Password');

    await t.expect(getPageUrl()).contains('localhost:8080', {timeout: 10000});

});
