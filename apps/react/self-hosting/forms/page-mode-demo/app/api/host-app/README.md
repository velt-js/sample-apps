# Host App Backend

This folder contains **your application's** backend logic, separate from the Velt implementation.

## Separation of Concerns

- **`/api/host-app/*`** - Your app's user management and business logic
- **`/api/velt/*`** - Velt self-hosting implementation (comments, attachments, reactions)

## User Management

The `/api/host-app/users/save` endpoint is called from `app/userAuth/AppUserContext.tsx` to save users to the MongoDB `users` collection when they log in.

This keeps user management in your host app context, while Velt fetches users on-demand via the `/api/velt/users/get` endpoint (which uses the Velt Python SDK).

## Why This Structure?

This demo focuses on showing the **Velt implementation** as a reference for clients, while keeping the **host app concerns** (like user creation and authentication) clearly separated.

In your real application:
- Replace `AppUserContext.tsx` with your actual authentication system
- Keep the `/api/velt/*` backend as-is for Velt self-hosting
- Customize `/api/host-app/*` for your app's needs
