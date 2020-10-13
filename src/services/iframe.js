function createIframeBuilder(requester) {

    function buildScript(company) {
        const script = document.createElement('script');
        const [firstName, ...lastName] = company.name.split(' ');

        script.id = 'getnet-loader-script';
        script.src = 'https://checkout-sandbox.getnet.com.br/loader.js';

        script.setAttribute('data-getnet-sellerid', 'a968fd33-ca30-4ebe-b242-4d6328aeaada');
        script.setAttribute('data-getnet-payment-methods-disabled', '[]');
        script.setAttribute('data-getnet-customerid', '12345');
        script.setAttribute('data-getnet-orderid', '12345');
        script.setAttribute('data-getnet-button-class', '__triggerClass');
        script.setAttribute('data-getnet-customer-first-name', firstName);
        script.setAttribute('data-getnet-customer-last-name', lastName.join(' '));
        script.setAttribute('data-getnet-customer-document-type', 'CNPJ');
        script.setAttribute('data-getnet-customer-document-number', company.cnpj);
        script.setAttribute('data-getnet-customer-email', 'cliente@teste.com');
        script.setAttribute('data-getnet-customer-address-street', 'Avenida Rintarou');
        script.setAttribute('data-getnet-customer-address-number', '100');
        script.setAttribute('data-getnet-customer-address-neighborhood', 'Akihabara');
        script.setAttribute('data-getnet-customer-address-city', 'Hokkaido');
        script.setAttribute('data-getnet-customer-address-state', 'XP');
        script.setAttribute('data-getnet-customer-address-zipcode', '04578907');
        script.setAttribute('data-getnet-customer-country', 'Brasil');
        script.setAttribute('data-getnet-shipping-address', '[]');
        script.setAttribute('data-getnet-items', '[{"name":"","description":"","value":0,"quantity":0,"sku":""}]');
        script.setAttribute('withCredentials', 'true');

        return script;
    }

    return async (price, callback) => {
        const script = buildScript(await requester.get('/me'));
        const token = 'Bearer ' + (await requester.get('/getnet-authentication')).bearer_token;
        script.setAttribute('data-getnet-token', token);
        script.setAttribute('data-getnet-amount', price.toFixed(2));

        document.body.appendChild(script);

        script.onload = callback;
    };
}

export default createIframeBuilder;