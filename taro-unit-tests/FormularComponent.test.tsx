/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import PageChannelCreate from "../PageChannelCreate"
import { UserIDContext } from "../UserIDContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";
import Header from "../Header";
import { ChannelResource } from "../../ChannelResources";
import mockFetch from "./mockFetch";
import App from "../../App";

const longName = 'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest';
const longDesc = ( 'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' + 
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' + 
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
                'ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' )


describe('FormularComponent', () => {
    const testCh: ChannelResource = {
        id: '5678',
        name: 'Test channel',
        description: 'Test channel desc',
        ownerId: '1234',
        public: true,
        closed: false
    }

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('ForumularComponent with undefined channel', async () => {
        const setUserIDMock = jest.fn();
            render(
                <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                    <MemoryRouter initialEntries={[`/channel/create`]}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <Header />
                            <Routes>
                                <Route path="/channel/create" element={<PageChannelCreate />}/>
                            </Routes>
                        </ErrorBoundary> 
                    </MemoryRouter>
                </UserIDContext.Provider>
            )
        const formularComponent = screen.getByRole('form');
        expect(formularComponent).toBeInTheDocument();

        expect(screen.getByLabelText(/Name/i)).not.toHaveValue('Channel 1');
        expect(screen.getByLabelText(/Description/i)).not.toHaveValue('Description 1');
    })

    test('FormularComponent with defined channel', async () => {
        const setUserIDMock = jest.fn();
        mockFetch();
        const orgError = console.error;
        try{
            console.error = () => { }
            await act(async () => {
                render(
                    <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                        <MemoryRouter initialEntries={[`/channel/edit/${123456}`]}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <App />
                            </ErrorBoundary> 
                        </MemoryRouter>
                    </UserIDContext.Provider>
                );
            })
        } finally {
            console.error = orgError;
        }
        const formularComponent = screen.getByRole('form');
        expect(formularComponent).toBeInTheDocument();

        expect(screen.getByLabelText(/Name/i)).toHaveValue('Channel 1');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('Description 1');
    })

    test('FormularComponent validate errors', async () => {
        const setUserIDMock = jest.fn();
            render(
                <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                    <MemoryRouter initialEntries={[`/channel/create`]}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <Header />
                            <Routes>
                                <Route path="/channel/create" element={<PageChannelCreate />}/>
                            </Routes>
                        </ErrorBoundary> 
                    </MemoryRouter>
                </UserIDContext.Provider>
            )

        const name = screen.getByLabelText(/Name/i);
        const desc = screen.getByLabelText(/Description/i);
        
        await act(async () => {
            fireEvent.change(name, {target: {value: 'name'}})
            fireEvent.blur(name);
            fireEvent.change(desc, {target: {value: 'desc'}})
            fireEvent.blur(desc);
        })

        expect(screen.getByText(/Name must be at least 5 characters long./i)).toBeInTheDocument();
        expect(screen.getByText(/Description must be at least 5 characters long./i)).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(name, {target: {value: longName}});
            fireEvent.blur(name);
            fireEvent.change(desc, {target: {value: longDesc}})
            fireEvent.blur(desc);
        })

        expect(screen.getByText(/Only 100 characters are allowed./i)).toBeInTheDocument();
        expect(screen.getByText(/Only 1000 characters are allowed./i)).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(name, {target: {value: 'name 1'}})
            fireEvent.blur(name);
            fireEvent.change(desc, {target: {value: 'desc 1'}})
            fireEvent.blur(desc);
        })

        expect(screen.queryByText(/Name must be at least 5 characters long./i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Description must be at least 5 characters long./i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Only 100 characters are allowed./i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Only 1000 characters are allowed./i)).not.toBeInTheDocument();
    })

    test('checkPublic function', async () => {
        const setUserIDMock = jest.fn();
        mockFetch();
        const orgError = console.error;
        try{
            console.error = () => { }
            await act(async () => {
                render(
                    <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                        <MemoryRouter initialEntries={[`/channel/edit/${123456}`]}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <App />
                            </ErrorBoundary> 
                        </MemoryRouter>
                    </UserIDContext.Provider>
                );
            })
        } finally {
            console.error = orgError;
        }

        const publicCheckbox = screen.getByTestId("public-check") as HTMLInputElement;

        await act(async () =>{
            fireEvent.click(publicCheckbox);
        })
        expect(publicCheckbox.checked).not.toBeTruthy();
        expect(publicCheckbox.checked).toBeFalsy();

        await act(async () =>{
            fireEvent.click(publicCheckbox);
        })
        expect(publicCheckbox.checked).not.toBeFalsy();
        expect(publicCheckbox.checked).toBeTruthy();
    })

    test('checkClosed function', async () => {
        const setUserIDMock = jest.fn();
        mockFetch();
        const orgError = console.error;
        try{
            console.error = () => { }
            await act(async () => {
                render(
                    <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                        <MemoryRouter initialEntries={[`/channel/edit/${123456}`]}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <App />
                            </ErrorBoundary> 
                        </MemoryRouter>
                    </UserIDContext.Provider>
                );
            })
        } finally {
            console.error = orgError;
        }

        const closedCheckbox = screen.getByTestId("closed-check") as HTMLInputElement;

        await act(async () => {
            fireEvent.click(closedCheckbox);
        })
        expect(closedCheckbox.checked).not.toBeFalsy();
        expect(closedCheckbox.checked).toBeTruthy();

        await act(async () => {
            fireEvent.click(closedCheckbox);
        })
        expect(closedCheckbox.checked).not.toBeTruthy();
        expect(closedCheckbox.checked).toBeFalsy();
    })

    test('No Channel fetch error', async () => {
        const setUserIDMock = jest.fn();
        const orgError = console.error;
        try{
            console.error = () => { }
            await act(async () => {
                render(
                    <UserIDContext.Provider value={{ userID: '1234', setUserID: setUserIDMock}}>
                        <MemoryRouter initialEntries={[`/channel/edit/${123456}`]}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <App />
                            </ErrorBoundary> 
                        </MemoryRouter>
                    </UserIDContext.Provider>
                );
            })
        } finally {
            console.error = orgError;
        }
        expect(screen.getByText(/Something went wrong:/i)).toBeInTheDocument();
    })
})