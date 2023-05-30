/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ErrorBoundary } from 'react-error-boundary';

import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import ErrorFallback from '../ErrorFallback';
import mockFetch from './mockFetch';


test('Board', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }
        await act(() => {
            render(<MemoryRouter initialEntries={["/"]}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary> 
            </MemoryRouter>);
        })

    } finally {
        console.error = orgError;
    }
    const title = screen.getAllByText(/Channel [12]/i);
    expect(title.length).toBeGreaterThanOrEqual(2);
});

test('Board error, empty', async () => {
    const orgError = console.error;
    try {
        console.error = () => { }
        await act(async () => {
            render(<MemoryRouter initialEntries={["/"]}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary> 
            </MemoryRouter>);
        })

    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/undefined/i);
    expect(err[0]).toBeInTheDocument();
});

test('Channel', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/channel/${123456}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const title = screen.getByText(/Channel 1/i);
    const owner = screen.getByText(/Owner 1/i);
    expect(title).toBeInTheDocument();
    expect(owner).toBeInTheDocument();
})

test('Channel error, wrong id', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act( async () => {
            render(
                <MemoryRouter initialEntries={[`/channel/${12345}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/Error/i);
    expect(err[0]).toBeInTheDocument();
})

test('Channel error, invalid id', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/channel/bbbb}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/Validation Error/i);
    expect(err[0]).toBeInTheDocument();
})

test('Channel error, empty', async () => {
    const orgError = console.error;
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/channel/${123456}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/undefined/i);
    expect(err[0]).toBeInTheDocument();
})

test('Message', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/message/${51}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const title = screen.getByText(/Message 1/i);
    const owner = screen.getByText(/Author 1/i);
    expect(title).toBeInTheDocument();
    expect(owner).toBeInTheDocument();
})

test('Message error, wrong id', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/message/${60}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/Error/i);
    expect(err[0]).toBeInTheDocument();
})

test('Message error, invalid id', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/message/bbbbb`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/Validation Error/i);
    expect(err[0]).toBeInTheDocument();
})

test('Message error, empty', async () => {
    const orgError = console.error;
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/message/${51}`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const err = screen.getAllByText(/undefined/i);
    expect(err[0]).toBeInTheDocument();
})

test('Admin', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/admin`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const admin = screen.getAllByText(/admin/i);
    expect(admin[0]).toBeInTheDocument();
})

test('Prefs', async () => {
    const orgError = console.error;
    mockFetch();
    try{
        console.error = () => { }
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[`/prefs`]}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <App />
                    </ErrorBoundary> 
                </MemoryRouter>
            );
        })
    } finally {
        console.error = orgError;
    }
    const admin = screen.getAllByText(/prefs/i);
    expect(admin[0]).toBeInTheDocument();
})