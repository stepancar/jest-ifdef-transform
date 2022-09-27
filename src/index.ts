import type {SyncTransformer} from '@jest/transform';
import { parse } from 'ifdef-loader/preprocessor';

type IfdefConfig = {
  readonly 'ifdef-triple-slash': boolean;
  readonly 'ifdef-verbose': boolean;
  readonly 'ifdef-fill-with-blanks': boolean;
  readonly 'ifdef-uncomment-prefix': string;
} & Record<string, string>;

const IfdefTransformer: SyncTransformer<IfdefConfig> = {
  process(sourceText, sourcePath, options) {
    const { transformerConfig } = options;

    const verboseFlag = "ifdef-verbose";
    const verbose = transformerConfig[verboseFlag];

    const tripleSlashFlag = "ifdef-triple-slash";
    const tripleSlash = transformerConfig[tripleSlashFlag];

    const fillWithBlanksFlag = "ifdef-fill-with-blanks";
    const fillWithBlanks = transformerConfig[fillWithBlanksFlag];

    const uncommentPrefixFlag = "ifdef-uncomment-prefix";
    const uncommentPrefix = transformerConfig[uncommentPrefixFlag];

    const data = Object.fromEntries(Object.entries(transformerConfig).filter(([key]) => ![verboseFlag, tripleSlashFlag, fillWithBlanksFlag, uncommentPrefixFlag].includes(key)));

    try {
      const code = parse(sourceText, data, verbose, tripleSlash, sourcePath, fillWithBlanks, uncommentPrefix);

      return {
        code,
      }
    } catch (err) {
      const errorMessage = `jest-ifdef-transform error: ${err}`;
      console.log(errorMessage);

      return {
        code: sourceText
      };
    }
  },
}

export default IfdefTransformer;
