import chalk from 'chalk';
import { dedent } from 'ts-dedent';

import { FileDesc, TargetInfo } from '../../../types';
import { error as icon } from '../../components/icons';

const encode = (path: string) =>
  path
    .split('/')
    .map((component) => encodeURIComponent(component))
    .join('/');

export function uploadFailed({ target }: { target: FileDesc & TargetInfo }, debug = false) {
  const diagnosis =
    encode(target.targetPath) === target.targetPath
      ? 'The file may have been modified during the upload process.'
      : 'It seems the file path may contain illegal characters.';
  const message = dedent(chalk`
    ${icon} Failed to upload {bold ${target.localPath}} to {bold ${target.targetPath}}
    ${diagnosis}
    ${debug ? '' : chalk`Enable the {bold debug} option to get more information.`}
  `);
  return debug ? message + JSON.stringify(target, undefined, 2) : message;
}
