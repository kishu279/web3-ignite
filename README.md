This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Solana Local Validator Setup

To avoid RPC connection issues and rate limits when developing with Solana, it's recommended to run a local validator.

### Prerequisites

- **Solana CLI** - Install from [Solana CLI Installation Guide](https://docs.solana.com/cli/install-solana-cli-tools)
- **Rust** - Install from [Rust Installation Guide](https://rustup.rs/)

### Setup Local Validator

1. Start the local validator:

```bash
solana-test-validator
```

2. Configure Solana CLI to use the local validator:

```bash
solana config set --url http://127.0.0.1:8899
```

3. Verify the connection:

```bash
solana cluster-version
```

The local validator will run on `http://127.0.0.1:8899` and provide you with a development environment that doesn't have rate limits.

## Solana Development Resources

This project uses the following Solana libraries and resources for development:

### Libraries

- **@solana/web3.js** - [Documentation](https://docs.solana.com/developing/clients/javascript-api) - Official Solana JavaScript SDK
- **@solana/kit** - [Documentation](https://github.com/solana-labs/solana-kit) - Solana development toolkit

### Documentation

- **Solana Cookbook** - [https://solanacookbook.com/](https://solanacookbook.com/) - Comprehensive guides and code examples for Solana development

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
