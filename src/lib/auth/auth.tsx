import { getSession } from '@auth0/nextjs-auth0';
//on login i want to add the user to firebase and then redirect to the dashboard
export function Login() {
  return <a href="/api/auth/login?returnTo=/register-user"><button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Login / Register</button></a>;
}

export function Logout() {
  return <a href="/api/auth/logout"><button className="px-4 py-2 text-white bg-destructive rounded-lg text-destructive-foreground ">Logout</button></a>;
}
export async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  return (
    user && (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
        <img className="w-12 h-12 rounded-full" src={user.picture} alt={user.name} />
        <div className='flex flex-col '>
          <h2 className="mt-4 font-semibold text-sm">{user.name}</h2>
          <p className="text-gray-600 text-xs">{user.email}</p>
        </div>
      </div>
    )
  );
}
