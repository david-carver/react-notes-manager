export default class ValidatorService {
  static min(inputValue, minCharacter) {
    if (inputValue.length < minCharacter) {
      return `Can't be less than ${minCharacter} characters`;
    }
  }

  static max(inputValue, maxCharacter) {
    if (inputValue.length > maxCharacter) {
      return `Can't be more than ${maxCharacter} characters`;
    }
  }
}
