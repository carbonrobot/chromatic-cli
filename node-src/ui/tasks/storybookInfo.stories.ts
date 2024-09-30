import task from '../components/task';
import { initial, pending, success } from './storybookInfo';

export default {
  title: 'CLI/Tasks/StorybookInfo',
  decorators: [(storyFunction: any) => task(storyFunction())],
};

const storybook = {
  version: '5.3.0',
  viewLayer: 'web-components',
  builder: { name: 'webpack4', packageVersion: '5.3.0' },
  addons: [],
};
const addons = [{ name: 'actions' }, { name: 'docs' }, { name: 'design-assets' }];

export const Initial = () => initial;

export const Pending = () => pending();

export const Success = () => success({ storybook } as any);

export const WithAddons = () => success({ storybook: { ...storybook, addons } } as any);
