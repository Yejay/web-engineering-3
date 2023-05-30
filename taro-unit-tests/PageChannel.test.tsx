/* eslint-disable testing-library/no-unnecessary-act */
import mockFetch from "./mockFetch";
import ErrorFallback from "../ErrorFallback";
import App from "../../App";
import { UserIDContext } from "../UserIDContext";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

test('edit-btn not displayed', async () => {
    const setUserIDMock = jest.fn();
    mockFetch();
    const orgError = console.error;
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <UserIDContext.Provider value={{ userID: undefined, setUserID: setUserIDMock}}>
                    <MemoryRouter initialEntries={[`/channel/${123456}`]}>
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

    expect(screen.queryByTestId(/edit-btn/i)).not.toBeInTheDocument();
    expect(screen.getByTestId(/no-btn/i)).toBeInTheDocument();
})