import Responseable from 'src/utils/Ports/Responseable';

export default interface SendeableMail {
  sendMail(to: string, text: string, from: string, pass: string, subject: string): Promise<Responseable>;
}
