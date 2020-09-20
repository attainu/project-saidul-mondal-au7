import { expect } from 'chai';
import validateRegisterInput from '../src/validation/registerAuth';

describe('Register with valid input', () => {
    it('Should register properly', done => {
        const registerData = {
            firstname: 'Saidul',
            lastname: 'Mondal',
            email: 'mondalsaidul3232@gmail.com',
            password: 'Mondal@1234',
            password2: 'Mondal@1234'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.true;
        expect(errors).to.deep.equal({});
        done();
    });
});

describe('Register with invalid password2 (non matching)', () => {
    it('Should return error', done => {
        const registerData = {
            firstname: 'Saidul',
            lastname: 'Mondal',
            email: 'mondalsaidul3232@gmail.com',
            password: 'Mondal@1234',
            password2: 'Mondal@234'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password2: "Passwords must match"});
        done();
    });
});

describe('Register with invalid password (empty passwords)', () => {
    it('Should return error', done => {
        const registerData = {
            firstname: 'Saidul',
            lastname: 'Mondal',
            email: 'mondalsaidul3232@gmail.com',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            password: "Password must be at least 6 characters",
            password: "Password must have at least one special character.",
            password2: "Confirm Password field is required"
        });
        done();
    });
});

describe('Register with invalid password (non matching password2)', () => {
    it('Should return error', done => {
        const registerData = {
            firstname: 'Saidul',
            lastname: 'Mondal',
            email: 'mondalsaidul3232@gmail.com',
            password: 'Mondal@1234',
            password2: 'Mondal@123'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password2: "Passwords must match"});
        done();
    });
});

describe('Register with invalid password (non-proper length)', () => {
    it('Should return error', done => {
        const registerData = {
            firstname: 'Saidul',
            lastname: 'Mondal',
            email: 'mondalsaidul@gmail.com',
            password: 'Mon@1',
            password2: 'Mon@1'
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({password: "Password must be at least 6 characters"});
        done();
    });
});

describe('Register with empty form', () => {
    it('Should return error', done => {
        const registerData = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: ''
        }

        const { errors, isValid } = validateRegisterInput(registerData);
        expect(isValid).to.be.false;
        expect(errors).to.deep.equal({
            firstname: "Firstname field is required",
            firstname: "Name must be between 2 and 30 characters",
            lastname: "Lastname field is required",
            lastname: "Name must be between 1 and 30 characters",
            name: "Lastname field is required",
            email: "Email is invalid",
            password: "Password must be at least 6 characters",
            password: "Password must have at least one special character.",
            password2: "Confirm Password field is required"
        });
        done();
    });
});

