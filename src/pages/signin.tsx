import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    console.log("ding");
    if (isConnected) {
      await disconnectAsync();
    }

    // const { account, chain } = await connectAsync({
    //   connector: new MetaMaskConnector(),
    // });

    const { account, chain } = await connectAsync({
      connector: new WalletConnectConnector({
        options: {
          qrcode: true,
        },
      }),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });
    console.log("message", message);

    const signature = await signMessageAsync({ message });
    console.log("signature", signature);

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={handleAuth}>Authenticate via Metamask</button>
    </div>
  );
}

export default SignIn;
