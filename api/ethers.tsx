import { BigNumber, Contract, FixedNumber, Transaction, ethers } from "ethers";
import { PhantasmManagerAbi} from '../api/abis/PhantasmManager'

export class MarginTrading {
  private signer!: ethers.providers.JsonRpcSigner;
  private contract!: Contract;

  public static getContract(
    signer: ethers.providers.JsonRpcSigner
  ) {
    return new Contract(
      "0x266593b91068be4c007567a6243756cb763eea5d",
      PhantasmManagerAbi.abi,
      signer
    );
  }

  constructor(signer: ethers.providers.JsonRpcSigner) {
    this.signer = signer;
    this.contract = MarginTrading.getContract(this.signer);
  }

  async openPosition(positionData: any): Promise<any> {
    const { spentToken, obtainedToken, deadline, margin, positionType } =
      positionData;

    const marginValue = Ether.utils.parseTokenUnits(
      margin.toString(),
      spentToken
    );

    try {
      const position = await this.contract.openPosition(
        {
          spentToken,
          obtainedToken,
          deadline: BigNumber.from(
            Math.floor(Date.now() / 1000) + 60 * deadline
          ).toHexString(),
          collateral: marginValue.toHexString(),
          collateralIsSpentToken: positionType === "long" ? true : false,
        },
        {
          gasLimit: 10000000,
        }
      );
      return position;
    } catch (error) {
      console.error(error);
    }
  }
}
