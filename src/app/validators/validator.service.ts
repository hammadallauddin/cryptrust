import { Injectable } from "../../../node_modules/@angular/core";
import { ValidatorAuthService } from "./auth/validator-auth.service";
import { Validator } from "./validator.model";

@Injectable()

export class ValidatorService {
	validators = [];
	constructor (private validatorAuthService: ValidatorAuthService) {
		this.validators = this.validatorAuthService.getValidators();
	}

	getValidator(index: number) {
		return this.validators[index];
	}

	updateValidator(validator: Validator, index: number) {
		this.validators[index]  = validator;
		this.validatorAuthService.updateValidator(this.validators);
	}

	getAllValidators() {
		return this.validators.slice();
	}

}
