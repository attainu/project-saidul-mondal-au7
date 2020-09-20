import { expect } from 'chai';
import validateLoginInput from '../src/validation/LoginAuth';

describe('Login with valid input', () => {
    it('Should login properly', done => {
        const LoginData = {
            email: 'mondalsaidul3232@gmail.com',
            password: 'mondal1234',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.true;
        expect(errors).to.deep.equal({});
        done();
    });
});

describe('Login with invalid email (non email)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'mondalsaidul3232',
            password: 'mondal1234',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({email: "Email is invalid"});
        done();
    });
});

describe('Login with invalid password (empty password)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'mondalsaidul3232@gmail.com',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            password: "Password must be at least 6 characters"
        });
        done();
    });
});

describe('Login with invalid password (non-proper length)', () => {
    it('Should return error', done => {
        const LoginData = {
            email: 'mondalsaidul3232@gmail.com',
            password: 'monda',
            password2: 'monda'
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password: "Password must be at least 6 characters"});
        done();
    });
});

describe('Login with empty form', () => {
    it('Should return error', done => {
        const LoginData = {
            email: '',
            password: '',
        }

        const { errors, isValid } = validateLoginInput(LoginData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            email: "Email field is required",
            password: "Password must be at least 6 characters",
        });
        done();
    });
});

