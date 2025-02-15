import { SessionStorage } from "@remix-run/server-runtime";
import { AuthenticateOptions, Strategy } from "remix-auth";

export interface FormStrategyVerifyParams {
  /**
   * A FormData object with the content of the form used to trigger the
   * authentication.
   *
   * Here you can read any input value using the FormData API.
   */
  form: FormData;
}

export class FormStrategy<User> extends Strategy<
  User,
  FormStrategyVerifyParams
> {
  name = "form";

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions
  ): Promise<User> {
    let form = await request.formData();

    let user: User;
    try {
      user = await this.verify({ form });
    } catch (error) {
      let message = (error as Error).message;
      return await this.failure(message, request, sessionStorage, options);
    }

    return this.success(user, request, sessionStorage, options);
  }
}
