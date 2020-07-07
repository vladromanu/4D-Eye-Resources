import SearchPage from './pages/search-page-model';
import $ from "jquery";
import { Selector } from "testcafe";

fixture `Search Page Tests`
    .page `http://bc.stage.aws.dotw.com`
    .httpAuth({
        username: 'webbeds',
        password: 'book!ngc3nt3r'
    }).beforeEach( async t => {
        await page.clearFormFilters();
    })
    .afterEach( async t => {
        await page.clearFormFilters();
    });



const page = new SearchPage();

test('Advanced search toggle to view more filters', async t => {
    await t.click(page.btn_advancedSearch) // toggle on
        .expect(page.cnt_advancedSearch.visible).ok()
        .click(page.btn_advancedSearch) // toggle off
        .expect(page.cnt_advancedSearch.visible).notOk();
}).after( async t => {
    // ..
});

test('Clear form button removes all filter data', async t => {
    await t.click(page.btn_advancedSearch)
        .typeText(page.input_BookingRefNo, 'RefNo')
        .typeText(page.input_PaxFirstName, 'John')
        .typeText(page.input_PaxLastName, 'Doe')
        .typeText(page.input_CheckInDate, '01-Jan-2020')
            .pressKey('tab')
        .typeText(page.input_CheckOutDate, '10-Jan-2020')
        .typeText(page.input_BookingDateFrom, '01-Dec-2019')
            .pressKey('tab')
        .typeText(page.input_BookingDateTo, '31-Dec-2019')
            .pressKey('tab')
        .click(page.btn_clearForm)
        .expect(page.input_BookingRefNo.value).contains('', { timeout: 50 })
        .expect(page.input_PaxFirstName.value).contains('', { timeout: 50 })
        .expect(page.input_PaxLastName.value).contains('', { timeout: 50 })
        .expect(page.input_CheckInDate.value).contains('', { timeout: 50 })
        .expect(page.input_CheckOutDate.value).contains('', { timeout: 50 })
        .expect(page.input_BookingDateFrom.value).contains('', { timeout: 50 })
        .expect(page.input_BookingDateTo.value).contains('', { timeout: 50 });
}).after( async t => {
    // ..
});

test('No results found on search returns -No Search Results Found- message ', async t => {
    await t
        .typeText(page.input_BookingRefNo, 'fail')
        .click(page.btn_search)
        .expect(page.cnt_error.visible).ok('',{ timeout: 25000 })
        .expect(page.cnt_error.innerText).contains('No Search Results Found',{ timeout: 25000 })
        .expect(page.cnt_error.innerText).contains('Try using advanced search feature',{ timeout: 25000 });
}).after( async t => {
    // ..
});

test('Connection failed returns -No Search Results Found- message ', async t => {
    await t
        .typeText(page.input_BookingRefNo, 'conn')
        .click(page.btn_search)
        .expect(page.cnt_error.visible).ok('',{ timeout: 25000 })
        .expect(page.cnt_error.innerText).contains('No connection could be established to the Booking Center API',{ timeout: 25000 })
        .expect(page.cnt_error.innerText).contains('Please try again later',{ timeout: 25000 });
}).after( async t => {
    // ..
});

test('Search filters remain visible after search button is pressed', async t => {
    await t
        .typeText(page.input_BookingRefNo, 'RefNo')
        .typeText(page.input_PaxFirstName, 'John')
        .typeText(page.input_PaxLastName, 'Doe')
        .click(page.btn_search)
        .expect(page.input_BookingRefNo.value).contains('RefNo')
        .expect(page.input_PaxFirstName.value).contains('John')
        .expect(page.input_PaxLastName.value).contains('Doe')
        .click(page.btn_clearForm);
}).after( async t => {
    // ..
});

test('No fields render errors on BookingRefNo', async t => {
    const feedback =  page.input_BookingRefNo.parent().find('.invalid-feedback');

    await t
        .click(page.btn_search)
        .expect(feedback.textContent).contains('At least one of these fields is required : Travel From / Booking From / Booking Reference');
});


test('Validate the BookingRefNO field', async t => {
    const feedback =  page.input_BookingRefNo.parent().find('.invalid-feedback');

    await page.fillAndSubmit(page.input_BookingRefNo, 'abc_@#!');
    await t.expect(feedback.textContent).contains('Invalid Booking Reference format');
    await page.clearFormFilters();

    await page.fillAndSubmit(page.input_BookingRefNo, 'a');
    await t.expect(feedback.textContent).contains('Invalid Booking Reference format');
    await page.clearFormFilters();

    await page.fillAndSubmit(page.input_BookingRefNo, 'aa');
    await t.expect(feedback.textContent).contains('Invalid Booking Reference format');
    await page.clearFormFilters();

    await page.fillAndSubmit(page.input_BookingRefNo, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await t.expect(feedback.textContent).contains('The booking ref no may not be greater than 30 characters.');
    await page.clearFormFilters();

}).after( async t => {
    // ..
});



test('Validate the PaxFirstName field', async t => {
    const feedback =  page.input_PaxFirstName.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_PaxFirstName, 'abc_@#!')
        .click(page.btn_search)
        .expect(feedback.textContent).contains('Invalid characters provided');

}).after( async t => {
    // ..
});


test('Validate the PaxLastName field', async t => {
    const feedback =  page.input_PaxLastName.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_PaxLastName, 'abc_@#!')
        .click(page.btn_search)
        .expect(feedback.textContent).contains('Invalid characters provided');

}).after( async t => {
    // ..
});

/**
 * ====================================================
 *                  TRAVEL DATE
 * ====================================================
 */

test('Validate the CheckInDate field', async t => {
    const feedback = page.input_CheckInDate.parent().find('.invalid-feedback');
    const opposite = page.input_CheckOutDate.parent().find('.invalid-feedback');


    await page.fillAndSubmit(page.input_CheckInDate, 'abc_@#!');
    await t.expect(feedback.textContent).contains('Invalid Travel From format');

    await page.fillAndSubmit(page.input_CheckInDate, '2020-01-01');
    await t.expect(feedback.textContent).contains('Invalid Travel From format');


    await page.fillAndSubmit(page.input_CheckInDate, '2020-01-01__INVALID');
    await t.expect(feedback.textContent).contains('Invalid Travel From format');


    await page.fillAndSubmit(page.input_CheckInDate, '01-May-2020.');
    await t.expect(feedback.textContent).contains('Invalid Travel From format');


    await t
        .click(page.btn_clearForm)
        .typeText(page.input_CheckInDate, '01-May-2020') // valid date
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")// no date
        .click(page.btn_search)
        .expect(opposite.textContent).contains('Please fill in date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });

test('Validate the CheckOutDate field', async t => {
    const feedback = page.input_CheckOutDate.parent().find('.invalid-feedback');
    const opposite = page.input_CheckInDate.parent().find('.invalid-feedback');

    await page.fillAndSubmit(page.input_CheckOutDate, 'abc_@#!');
    await t.expect(feedback.textContent).contains('Invalid Travel To format');

    await page.fillAndSubmit(page.input_CheckOutDate, '2020-01-01');
    await t.expect(feedback.textContent).contains('Invalid Travel To format');


    await page.fillAndSubmit(page.input_CheckOutDate, '2020-01-01__INVALID');
    await t.expect(feedback.textContent).contains('Invalid Travel To format');


    await page.fillAndSubmit(page.input_CheckOutDate, '01-May-2020.');
    await t.expect(feedback.textContent).contains('Invalid Travel To format');

    await t
        .click(page.btn_clearForm)
        .typeText(page.input_CheckOutDate, '01-May-2020') // valid date
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")// no date
        .click(page.btn_search)
        .expect(opposite.textContent).contains('Please fill in date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });



test('CheckInDate bigger than CheckOutDate', async t => {
    const chkOutDate = page.input_CheckOutDate.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_CheckInDate, '10-Apr-2020')
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")
        .typeText(page.input_CheckOutDate, '01-Apr-2020')
        .click(page.btn_search)
        .expect(chkOutDate.textContent).contains('End Date must be after Start Date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });

test('CheckOutDate exceeds the 1 month range', async t => {
    const chkOutDate = page.input_CheckOutDate.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_CheckInDate, '01-Apr-2020')
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")
        .typeText(page.input_CheckOutDate, '01-Jun-2020')
        .click(page.btn_search)
        .expect(chkOutDate.textContent).contains('The date range exceeds the maximum limit of 1 month');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });

/**
 * ====================================================
 *                  BOOKING DATE
 * ====================================================
 */
test('Validate the CheckInDate field', async t => {
    const feedback = page.input_BookingDateFrom.parent().find('.invalid-feedback');
    const opposite = page.input_BookingDateTo.parent().find('.invalid-feedback');


    await page.fillAndSubmit(page.input_BookingDateFrom, 'abc_@#!');
    await t.expect(feedback.textContent).contains('Invalid Booking From format');

    await page.fillAndSubmit(page.input_BookingDateFrom, '2020-01-01');
    await t.expect(feedback.textContent).contains('Invalid Booking From format');


    await page.fillAndSubmit(page.input_BookingDateFrom, '2020-01-01__INVALID');
    await t.expect(feedback.textContent).contains('Invalid Booking From format');


    await page.fillAndSubmit(page.input_BookingDateFrom, '01-May-2020.');
    await t.expect(feedback.textContent).contains('Invalid Booking From format');


    await t
        .click(page.btn_clearForm)
        .typeText(page.input_BookingDateFrom, '01-May-2020') // valid date
        .pressKey('tab')
        .selectText(page.input_BookingDateTo).pressKey("delete")// no date
        .click(page.btn_search)
        .expect(opposite.textContent).contains('Please fill in date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });

test('Validate the CheckOutDate field', async t => {
    const feedback = page.input_BookingDateTo.parent().find('.invalid-feedback');
    const opposite = page.input_BookingDateFrom.parent().find('.invalid-feedback');

    await page.fillAndSubmit(page.input_BookingDateTo, 'abc_@#!');
    await t.expect(feedback.textContent).contains('Invalid Booking To format');

    await page.fillAndSubmit(page.input_BookingDateTo, '2020-01-01');
    await t.expect(feedback.textContent).contains('Invalid Booking To format');

    await page.fillAndSubmit(page.input_BookingDateTo, '2020-01-01__INVALID');
    await t.expect(feedback.textContent).contains('Invalid Booking To format');


    await page.fillAndSubmit(page.input_BookingDateTo, '01-May-2020.');
    await t.expect(feedback.textContent).contains('Invalid Booking To format');

    await t
        .click(page.btn_clearForm)
        .typeText(page.input_BookingDateTo, '01-May-2020') // valid date
        .pressKey('tab')
        .selectText(page.input_BookingDateTo).pressKey("delete")// no date
        .click(page.btn_search)
        .expect(opposite.textContent).contains('Please fill in date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });



test('BookingDateFrom bigger than BookingDateTo', async t => {
    const chkOutDate = page.input_BookingDateTo.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_BookingDateFrom, '10-Apr-2020')
        .pressKey('tab')
        .selectText(page.input_BookingDateTo).pressKey("delete")
        .typeText(page.input_BookingDateTo, '01-Apr-2020')
        .click(page.btn_search)
        .expect(chkOutDate.textContent).contains('End Date must be after Start Date');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });

test('BookingDateTo exceeds the 1 month range', async t => {
    const chkOutDate = page.input_BookingDateTo.parent().find('.invalid-feedback');

    await t
        .typeText(page.input_BookingDateFrom, '01-Apr-2020')
        .pressKey('tab')
        .selectText(page.input_BookingDateTo).pressKey("delete")
        .typeText(page.input_BookingDateTo, '01-Jun-2020')
        .click(page.btn_search)
        .expect(chkOutDate.textContent).contains('The date range exceeds the maximum limit of 1 month');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });


test('Upon a big search the loader is visible', async t => {

    const loader = Selector(".wb-search-loader");

    await t.click(page.btn_advancedSearch);

    await t
        .typeText(page.input_CheckInDate, '01-Jan-2020')
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")
        .typeText(page.input_CheckOutDate, '25-Jan-2020')
        .click(page.btn_search)
        .expect(page.cnt_searchResults.textContent).contains('Give us a moment')
        .expect(loader.exists).ok('', {timeout: 2000});

    await t.click(page.btn_advancedSearch);

});


test('Search for a booking by booking code ', async t => {

    const results = Selector(".wb-main-content");

    await t
        .typeText(page.input_BookingRefNo, '235232683')
        .click(page.btn_search);

    await t.expect(results.exists).ok('', { timeout: 15000 });

    await t.expect(page.cnt_searchResults.textContent).contains('235232683')
        .expect(page.cnt_searchResults.textContent).contains('Suraj Kumar')
        .expect(page.cnt_searchResults.textContent).contains('Cancelled')
        .expect(page.cnt_searchResults.textContent).contains('Customer Interface')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
    });

test('Search for a booking by booking code with invalid pax names still returns', async t => {

    const results = Selector(".wb-main-content");

    await t
        .typeText(page.input_BookingRefNo, '235232683')
        .typeText(page.input_PaxFirstName, 'INVALID')
        .typeText(page.input_PaxLastName, 'INVALID')
        .click(page.btn_search);

    await t.expect(results.exists).ok('', { timeout: 10000 });

    await t.expect(page.cnt_searchResults.textContent).contains('235232683')
        .expect(page.cnt_searchResults.textContent).contains('Suraj Kumar')
        .expect(page.cnt_searchResults.textContent).contains('Cancelled')
        .expect(page.cnt_searchResults.textContent).contains('Customer Interface')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
    });

test('Search for a booking by booking code with invalid dates still returns', async t => {

    const results = Selector(".wb-main-content");

    await t
        .typeText(page.input_BookingRefNo, '235232683')
        .typeText(page.input_CheckInDate, '01-Apr-2050')
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")
        .typeText(page.input_CheckOutDate, '03-Apr-2050')
        .typeText(page.input_BookingDateFrom, '01-Apr-2050')
        .pressKey('tab')
        .selectText(page.input_BookingDateTo).pressKey("delete")
        .typeText(page.input_BookingDateTo, '03-Apr-2050')
        .click(page.btn_search);

    await t.expect(results.exists).ok('', { timeout: 10000 });

    await t.expect(page.cnt_searchResults.textContent).contains('235232683')
        .expect(page.cnt_searchResults.textContent).contains('Suraj Kumar')
        .expect(page.cnt_searchResults.textContent).contains('Cancelled')
        .expect(page.cnt_searchResults.textContent).contains('Customer Interface')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('DUBAI')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020')
        .expect(page.cnt_searchResults.textContent).contains('11 Mar 2020');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });


test('Search for a valid interval returns data ', async t => {

    const results = Selector(".wb-main-content");

    await t
        .typeText(page.input_CheckInDate, '01-Jan-2020')
        .pressKey('tab')
        .selectText(page.input_CheckOutDate).pressKey("delete")
        .typeText(page.input_CheckOutDate, '05-Jan-2020')
        .click(page.btn_search);

    await t.expect(results.exists).ok('', { timeout: 10000 });

    await t.expect(page.cnt_searchResults.textContent).contains('Booking Ref')
        .expect(page.cnt_searchResults.textContent).contains('Supp Ref')
        .expect(page.cnt_searchResults.textContent).contains('Client Ref');

    await t.click(page.btn_advancedSearch);

})
    .before(async t => {
        await page.clearFormFilters();
        await t.click(page.btn_advancedSearch);
    });
