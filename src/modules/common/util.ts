import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class Util {
  public isEmail(search: string): boolean {
    const regexp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i);
    return regexp.test(search);
  }

  public async generatePwd(plainText: string): Promise<string> {
    const pwdText = await bcrypt.hash(plainText, 11);
    return pwdText;
  }
}
