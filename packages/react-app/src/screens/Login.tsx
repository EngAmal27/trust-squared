import { usePrivy } from "@privy-io/react-auth";

export default function Login() {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-auto max-w-md mx-auto">
      <img src="/logo2.svg" alt="trust" />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        disabled={disableLogin}
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
}
