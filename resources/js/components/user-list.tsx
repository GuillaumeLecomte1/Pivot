import { useEffect, useState } from 'react';

import { HttpClient, type HttpError } from '@/lib/http';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    apiUrl?: string;
}

type UserListState = { _tag: 'loading' } | { _tag: 'success'; users: User[] } | { _tag: 'error'; error: HttpError };

/**
 * UserList component that fetches users using the Effect-based HTTP client
 *
 * This component demonstrates integration between the HTTP client and React components,
 * showing how to handle loading, success, and error states with the Either pattern.
 */
export function UserList({ apiUrl = '/api/users' }: UserListProps) {
    const [state, setState] = useState<UserListState>({ _tag: 'loading' });

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await HttpClient.get<User[]>(apiUrl);

            if (result._tag === 'Right') {
                setState({ _tag: 'success', users: result.right.data });
            } else {
                setState({ _tag: 'error', error: result.left });
            }
        };

        fetchUsers();
    }, [apiUrl]);

    if (state._tag === 'loading') {
        return (
            <div data-testid="user-list-loading" className="user-list-loading">
                Loading...
            </div>
        );
    }

    if (state._tag === 'error') {
        return (
            <div data-testid="user-list-error" className="user-list-error">
                <p data-testid="error-message">Error: {state.error.message}</p>
                {state.error.status && <p data-testid="error-status">Status: {state.error.status}</p>}
            </div>
        );
    }

    return (
        <div data-testid="user-list" className="user-list">
            <ul data-testid="user-list-items">
                {state.users.map((user) => (
                    <li key={user.id} data-testid={`user-${user.id}`}>
                        <span data-testid={`user-${user.id}-name`}>{user.name}</span>
                        <span data-testid={`user-${user.id}-email`}>{user.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export type { User, UserListState };
