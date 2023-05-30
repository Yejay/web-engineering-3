/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';
import { UserIDContext } from '../UserIDContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageBoard from '../PageBoard';
import mockFetch from './mockFetch';

describe('header component', () => {
    jest.mock('../../backend/boardapi', () => ({
        getUserIdFromJWT: jest.fn(),
        login: jest.fn(),
        logout: jest.fn()
    }));
    test('header labeling while logged', async () => {
        const setUserIDMock = jest.fn();
        render(
            <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                <MemoryRouter initialEntries={[`/`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<PageBoard />}/>
                        </Routes>
                    </ErrorBoundary> 
                </MemoryRouter>
            </UserIDContext.Provider>
        )
    
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Service/i)).toBeInTheDocument();
        expect(screen.getByText(/Create Channel/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    })

    test('header labeling while nobodys logged', async () => {
        const setUserIDMock = jest.fn();
        render(
            <UserIDContext.Provider value={{ userID: undefined, setUserID: setUserIDMock}}>
                <MemoryRouter initialEntries={[`/`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<PageBoard />}/>
                        </Routes>
                    </ErrorBoundary> 
                </MemoryRouter>
            </UserIDContext.Provider>
        )
    
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Service/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    })

    test('header logout', async () => {
        const setUserIDMock = jest.fn();
        const userIDMock = '1234';
        render(
            <UserIDContext.Provider value={{ userID: userIDMock, setUserID: setUserIDMock}}>
                <MemoryRouter initialEntries={[`/`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<PageBoard />}/>
                        </Routes>
                    </ErrorBoundary> 
                </MemoryRouter>
            </UserIDContext.Provider>
        )

        await act( async () => {
            fireEvent.click(screen.getByText(/Logout/i));
        })

        expect(setUserIDMock).toHaveBeenLastCalledWith(undefined);
    })

    test('header opening loginDialog', async () => {
        const setUserIDMock = jest.fn();
        mockFetch();
        render(
            <UserIDContext.Provider value={{ userID: undefined, setUserID: setUserIDMock}}>
                <MemoryRouter initialEntries={[`/`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<PageBoard />}/>
                        </Routes>
                    </ErrorBoundary> 
                </MemoryRouter>
            </UserIDContext.Provider>
        )

        expect(screen.queryAllByText(/Login/i)[1]).toBeUndefined();
        expect(screen.queryByText(/E-Mail/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Password/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Cancel/i)).not.toBeInTheDocument();
        
        await act(async () => {
            fireEvent.click(screen.getByText(/Login/i));
        })

        expect(screen.getAllByText(/Login/i)[1]).toBeInTheDocument();
        expect(screen.getAllByText(/E-Mail/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Password/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Cancel/i)[0]).toBeInTheDocument();
    })
})