export const urlExplorer = ({
  chainId,
  address,
  txHash,
}: {
  chainId: ChainSupported;
  address?: string;
  txHash?: string;
}) => {
  const chainMetaMap: {
    [key: number]: {
      explorer: string;
    };
  } = {
    128123: {
      explorer: "https://testnet.explorer.etherlink.com",
    },
  };

  const chainMeta = chainMetaMap[chainId];

  if (!chainMeta) return "";

  if (address) {
    return `${chainMeta.explorer}/address/${address}`;
  }

  if (txHash) {
    return `${chainMeta.explorer}/tx/${txHash}`;
  }

  return "";
};
