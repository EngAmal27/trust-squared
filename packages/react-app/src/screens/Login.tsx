import { ethers } from "ethers";
import { createConfig, useConnect, useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "@wagmi/connectors";
import { celo } from "viem/chains";
import { http } from "viem";

// Create config
const config = createConfig({
  chains: [celo],
  connectors: [injected()],
  transports: {
    [celo.id]: http("https://forno.celo.org"),
  },
});

// Create a client for React Queryyarn add wagmi @wagmi/connectors viem @tanstack/react-query

const queryClient = new QueryClient();

// Wrap your app with WagmiProvider and QueryClientProvider
export function MiniPay() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourComponent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Your component
function YourComponent() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  const onConnect = async () => {
    try {
      await connect({
        connector: injected(),
      });
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>Connected to {address}</div>
      ) : (
        <button onClick={onConnect}>Connect MiniPay</button>
      )}
    </div>
  );
}

// Your component
function MiniPayConnect() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  const onConnect = async () => {
    try {
      await connect({
        connector: injected(),
      });
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isConnected ? (
        <div className="text-green-500 font-bold">
          <p>Status: Connected to {address}</p>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="bg-blue-500 text-white px-5 py-2.5 border-none rounded-full cursor-pointer text-base"
        >
          Connect hoi MiniPay
        </button>
      )}
    </div>
  );
}

// export default function Login() {
//   let isMiniPlay = false;
//   if (window && window.ethereum) {
//     // User has a injected wallet

//     //@ts-expect-error blah
//     if (window.ethereum.isMiniPay) {
//       isMiniPlay = true;
//     }
//   }

//   const onConnect = async () => {
//     try {
//       // Configure wagmi
//       const config = createConfig({
//         chains: [celo],
//         connectors: [
//           injected({
//             target: "minipay",
//           }),
//         ],
//       });

//       // Connect
//       const result = await connect(config, {
//         connector: injected({
//           target: "minipay",
//         }),
//       });

//       console.log("Connected address:", result.account);
//       return result.account;
//     } catch (error) {
//       console.error("Error connecting to MiniPay:", error);
//       throw error;
//     }
//   };

//   // Using ethers v6 syntax
//   const connectWallet = async () => {
//     try {
//       //@ts-expect-error alsdkf
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//         params: [],
//       });

//       const celoMainnet = {
//         chainId: "0x42220",
//         chainName: "Celo Mainnet",
//         nativeCurrency: {
//           name: "CELO",
//           symbol: "CELO",
//           decimals: 18,
//         },
//         rpcUrls: ["https://forno.celo.org"],
//         blockExplorerUrls: ["https://explorer.celo.org"],
//       };

//       // Switch to Celo network
//       try {
//         //@ts-expect-error alsdkf
//         await window.ethereum.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: celoMainnet.chainId }],
//         });
//       } catch (switchError) {
//         //@ts-expect-error habibi
//         if (switchError.code === 4902) {
//           try {
//             //@ts-expect-error alsdkf
//             await window.ethereum.request({
//               method: "wallet_addEthereumChain",
//               params: [celoMainnet],
//             });
//           } catch (addError) {
//             console.error("Failed to add network:", addError);
//             throw addError;
//           }
//         }
//       }

//       // Create provider and signer
//       //@ts-expect-error alsdkf
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       console.log("Connected address:", address);
//       alert(`signer: ${signer}`);
//       alert(`address: ${address}`);
//       // return { signer, address };
//     } catch (error) {
//       alert(error);
//       // console.error("Error connecting wallet:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 items-center justify-center h-screen w-auto max-w-md mx-auto">
//       <img src="/logo2.svg" alt="logo" className="w-44" />
//       <button
//         onClick={connectWallet}
//         className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Connect Wallet
//       </button>
//     </div>
//   );
// }
