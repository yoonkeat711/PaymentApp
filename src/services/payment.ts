import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

mock.onPost('/payment').reply(200, {
    message: "Success transfer",
    status: 'Success',
})

const fetchPaymentService = async (amount: number, accountNumber: string) => {
    const response = await axios.post('/payment', { amount, accountNumber })
    return response;
};

export default {
    fetchPaymentService,
}
