/* eslint-disable testing-library/no-unnecessary-act */
import mockFetch from "./mockFetch";
import ErrorFallback from "../ErrorFallback";
import App from "../../App";
import { UserIDContext } from "../UserIDContext";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";


test('Board displays correct private channel id or public channel id', async () => {
    const setUserIDMock = jest.fn();
    mockFetch();
    const orgError = console.error;
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <UserIDContext.Provider value={{ userID: '2', setUserID: setUserIDMock}}>
                    <MemoryRouter initialEntries={[`/`]}>
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

    const privCh = screen.getAllByTestId(/private-channel-2/i);
    const pubCh = screen.getAllByTestId(/channel-1/i);

    expect(privCh[0]).toBeInTheDocument();
    expect(pubCh[0]).toBeInTheDocument();
})