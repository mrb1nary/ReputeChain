/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor.json`.
 */
export type Anchor = {
  "address": "8u2absR3zLEnTcsM542zjMNbeNzf1dpViq9FKPxAiFfd",
  "metadata": {
    "name": "anchor",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "scoreAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "key"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "score",
          "type": "u64"
        },
        {
          "name": "key",
          "type": "string"
        }
      ]
    },
    {
      "name": "update",
      "discriminator": [
        219,
        200,
        88,
        176,
        158,
        63,
        253,
        127
      ],
      "accounts": [
        {
          "name": "scoreAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "key"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "scoreAccount"
          ]
        }
      ],
      "args": [
        {
          "name": "newScore",
          "type": "u64"
        },
        {
          "name": "key",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "scoreAccount",
      "discriminator": [
        97,
        121,
        23,
        147,
        120,
        45,
        149,
        84
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "accountAlreadyInitialized",
      "msg": "The account has already been initialized. Please choose a new key."
    }
  ],
  "types": [
    {
      "name": "scoreAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "score",
            "type": "u64"
          },
          {
            "name": "initialized",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
