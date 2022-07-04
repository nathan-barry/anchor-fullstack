import { Idl } from "@project-serum/anchor";

const idl: Idl = {
  version: "0.1.0",
  name: "project",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "counter",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "update",
      accounts: [
        {
          name: "counter",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "data",
          type: "u64",
        },
      ],
    },
    {
      name: "increment",
      accounts: [
        {
          name: "counter",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "decrement",
      accounts: [
        {
          name: "counter",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Counter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "u64",
          },
        ],
      },
    },
  ],
  metadata: {
    address: "Dj1FHKXX59RdRTV6W2bjgtosU7oMPfPSWjaavhkdEgpf",
  },
};

export default idl;
