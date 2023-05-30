/* eslint-disable testing-library/no-unnecessary-act */
import LoginDialog from "../LoginDialog";
import { screen, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { login } from "../../backend/boardapi";
import { UserIDContext } from "../UserIDContext";


jest.mock('../../backend/boardapi', () => ({
    getUserIdFromJWT: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}));

test('loginDialog is shown correct', async () => {
    const orgError = console.error;
    try {
        console.error = () => { }
        await act(async () => {
            render(
            <LoginDialog show={true} setShow={() => {}} />);
        })
    } finally {
        console.error = orgError;
    }

    expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/E-Mail/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Password/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Cancel/i)[0]).toBeInTheDocument();
})

test('login onLogin function', async () => {
    (login as jest.Mock).mockResolvedValueOnce(true);
    const setUserIDMock = jest.fn();

    const orgError = console.error;
    try {
        console.error = () => { }
        render(
            <UserIDContext.Provider value={{userID: "1234", setUserID: setUserIDMock }}>
                <LoginDialog show={true} setShow={() => {}} />
            </UserIDContext.Provider>
        );

        const email = screen.getByLabelText(/E-Mail/i);
        const password = screen.getByLabelText(/Password/i);
        const logBtn = screen.getAllByText(/Login/i)[1];

        expect(login).not.toHaveBeenCalledWith('john@some-host.de', '1234')

        await act(async () => {
            fireEvent.change(email, {target: {value: 'john@some-host.de'}})
            fireEvent.change(password, {target: {value: '1234'}});
            fireEvent.click(logBtn);
        })

    } finally {
        console.error = orgError;
    }

    expect(login).toHaveBeenCalledWith('john@some-host.de', '1234')
})

test('login onLogin function, login failed', async () => {
    (login as jest.Mock).mockResolvedValueOnce(false);
    const setUserIDMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert');

    const orgError = console.error;
    try {
        console.error = () => { }
        render(
            <UserIDContext.Provider value={{userID: "1234", setUserID: setUserIDMock }}>
                <LoginDialog show={true} setShow={() => {}} />
            </UserIDContext.Provider>
        );

        const email = screen.getByLabelText(/E-Mail/i);
        const password = screen.getByLabelText(/Password/i);
        const logBtn = screen.getAllByText(/Login/i)[1];

        await act(async () => {
            fireEvent.change(email, {target: {value: 'john@some-host.de'}})
            fireEvent.change(password, {target: {value: '1234'}});
            fireEvent.click(logBtn);
        })

    } finally {
        console.error = orgError;
    }

    expect(login).toHaveBeenCalledWith('john@some-host.de', '1234')
    expect(alertMock).toHaveBeenCalledWith('Login nicht erfolgreich.');
})

test('login handleClose', async () => {
    const setShowMock = jest.fn();
    const orgError = console.error;
    try{
        console.error = () => {}
        render(
            <LoginDialog show={true} setShow={setShowMock} />
        )
        const cancelBtn = screen.getByText(/Cancel/i);
        
        await act(async () => {
            fireEvent.click(cancelBtn);
        })
    } finally {
        console.error = orgError;
    }
    expect(setShowMock).toHaveBeenLastCalledWith(false);
})