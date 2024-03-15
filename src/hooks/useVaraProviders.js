import {
    ApiProvider as GearApiProvider,
    AccountProvider,
  } from '@gear-js/react-hooks';
  
  
  function ApiProvider({ children }) {
    return <GearApiProvider providerAddress={"wss://testnet.vara-network.io"}>{children}</GearApiProvider>;
  }
  
  const providers = [ApiProvider, AccountProvider];
  
  function withProviders(Component) {
    return () => providers.reduceRight((children, Provider) => <Provider>{children}</Provider>, <Component />);
  }
  
  export { withProviders };