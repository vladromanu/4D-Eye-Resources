import {Selector, t} from 'testcafe';

export default class SearchPage {
    constructor() {
        // Inputs
        this.input_BookingRefNo = Selector('input[name=BookingRefNo]');
        this.input_PaxFirstName = Selector('input[name=PaxFirstName]');
        this.input_PaxLastName = Selector('input[name=PaxLastName]');
        this.input_CheckInDate = Selector('input[name=CheckInDate]');
        this.input_CheckOutDate = Selector('input[name=CheckOutDate]');
        this.input_AgencyName = Selector('input[name=AgencyName]');
        this.input_BookingDateFrom = Selector('input[name=BookingDateFrom]');
        this.input_BookingDateTo = Selector('input[name=BookingDateTo]');
        this.input_AgentRefNo = Selector('input[name=AgentRefNo]');
        this.input_HotelName = Selector('input[name=HotelName]');
        this.input_SupplierName = Selector('input[name=SupplierName]');
        this.input_SupplierRefNo = Selector('input[name=SupplierRefNo]');

        // Buttons and actions
        this.btn_advancedSearch = Selector('a.advanced-search');
        this.btn_clearForm = Selector('a.js-form-clear');
        this.btn_search = Selector('.js-btn-search');

        // Containers
        this.cnt_advancedSearch = Selector('#advancedSearchContainer');
        this.cnt_searchResults = Selector('.js-search-results');
        this.cnt_error = Selector('.wb-alert-container .wb-alert');
    }

    /**
     * Clears all the form filters
     * @returns {Promise<void>}
     */
    async clearFormFilters()
    {
        await t.click(this.btn_clearForm);
    }

    /**
     * Fills an input value and submit
     * @param __elem
     * @returns {Promise<void>}
     */
    async fillAndSubmit(__elem, __value)
    {
        await t.click(this.btn_clearForm)
            .typeText(__elem, __value)
            .click(this.btn_search);
    }
}
