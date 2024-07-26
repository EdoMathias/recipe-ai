import { eRole } from '../enums/role';
import Joi from 'joi';
import { ValidationError } from './client-errors';

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: eRole;

  constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  // validation
  private static registerValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(0).max(100),
    email: Joi.string().required().min(0).max(1000).email(),
    password: Joi.string().required().min(4).max(48),
    roleId: Joi.number().integer(),
  });

  public validateRegister(): void {
    const result = UserModel.registerValidationSchema.validate(this);
    if (result.error) {
      throw new ValidationError(result.error.message);
    }
  }
}
