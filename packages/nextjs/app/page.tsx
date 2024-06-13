"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth/index";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [newGreetingSubmitted, setNewGreetingSubmitted] = useState<string>("");

  const { data: yourContract } = useScaffoldContract({
    contractName: "YourContract",
  });

  console.log("YourContract", yourContract);

  const { data: currentGreeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleSubmitGreeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newGreetingSubmitted) {
      try {
        await writeYourContractAsync({
          functionName: "setGreeting",
          args: [newGreetingSubmitted],
        });
      } catch (error) {
        console.error("Error submitting greeting", error);
      }
    } else {
      console.error("No greeting submitted");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Welcome to Conflux Scaffold{" "}
            </span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        {/* Sample App on Conflux */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="px-5">
            <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
              <h1 style={{ fontSize: "2rem" }}>Sample Conflux App</h1>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Connected Address:</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", paddingBottom: "10px" }}>
              <Address address={connectedAddress} format="short" size="2xl" />
              <Balance address={connectedAddress} />
            </div>
            <h1 className="text-center text-lg">What Greeting Would You Like to Set?</h1>
            <form onSubmit={handleSubmitGreeting} style={{ display: "flex", flexDirection: "column" }}>
              <InputBase
                name="greet"
                placeholder="Greeting to be Set"
                value={newGreetingSubmitted}
                onChange={setNewGreetingSubmitted}
              />
              <button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "10px",
                  padding: "1rem",
                  margin: "1rem",
                }}
              >
                Set Greeting
              </button>
            </form>
            <p style={{ textAlign: "center" }}>Current Greeting is: {String(currentGreeting)}</p>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
