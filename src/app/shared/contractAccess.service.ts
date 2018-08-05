import {Injectable} from '@angular/core';
import Web3 from 'web3';
import {default as contract} from 'truffle-contract';
import {Subject} from 'rxjs/Rx';
import main_contract_artifact from '../../../build/contracts/MainContract.json';


@Injectable()
export class ContractAccessService {
	web3: Web3;
	MainContract: any;
	constructor() {
		if (typeof this.web3 !== 'undefined') {
			this.web3 = new Web3(this.web3.currentProvider);
		} else {
			this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
		}
		// tslint:disable-next-line:indent
		this.MainContract = contract(main_contract_artifact);
		this.MainContract.setProvider(this.web3.currentProvider);
	}
}
