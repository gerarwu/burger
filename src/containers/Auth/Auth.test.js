import reducer from '../../store/reducers/auth';

describe('Auth reducer test', ()=> {
    it('Should return the initial state', ()=> {
        expect( reducer(undefined, {}) ).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        });
    });
});