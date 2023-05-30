/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react"
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";
import Bomb from "./Bomb";
import * as boardapi from "../../backend/boardapi";
import { UserIDContext } from "../UserIDContext";
import UnauthorizedBomb from "./UnauthorizedBomb";



test('errorfallback test, catch error', async () => {
    const orgError = console.error;
    try{
        console.error = () => {}
        await act(async () => {
            render(
                <React.StrictMode>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}>
                        <Bomb />
                    </ErrorBoundary>
                </React.StrictMode>
            )
        });
    } finally {
        console.error = orgError;
    }
    const test = screen.getAllByText(/CABOOM/i);
    expect(test[0]).toBeInTheDocument();
    expect(test[1]).toBeInTheDocument();
})

test('errorfallback test, 401 code', async () => {
    const orgError = console.error;
    const setUserIDMock = jest.fn();
    jest.spyOn(console, "error");
    const logSpy = jest.spyOn(boardapi, 'logout')

    try{
        console.error = () => {}
        await act( async () => {
            render(
                <UserIDContext.Provider value={{userID: "user123", setUserID: setUserIDMock }}>
                    <React.StrictMode>
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}>
                            <UnauthorizedBomb />
                        </ErrorBoundary>
                    </React.StrictMode>
                </UserIDContext.Provider>
            )
        });
    } finally {
        console.error = orgError;
    }
    const errorMessage = screen.getAllByText(/Unauthorized/i);
    expect(errorMessage[0]).toBeInTheDocument();
    expect(logSpy).toHaveBeenCalled();
})